import { useQuery } from "@apollo/client";
import { TERM_QUERY } from "~~/utils/gql";
import { Term, TermAssetBalance, TermLoanBalance, UserAssetBalance, UserTermAssetBalance } from "~~/utils/gql/types";

interface UserTermQueryData {
  term: Term;
  userTermAssetBalances: Partial<UserTermAssetBalance>[];
  userAssetBalances: Partial<UserAssetBalance>[];
}

const useTermData = (id: string | undefined, address: string | undefined) => {
  const { loading, error, data } = useQuery<UserTermQueryData>(TERM_QUERY(id || "", address || ""), {
    pollInterval: 3000,
    notifyOnNetworkStatusChange: true,
  });

  const aggregateData = (
    term: Term,
    userTermAssetBalances: Partial<UserTermAssetBalance>[],
    userAssetBalances: Partial<UserAssetBalance>[],
  ) => {
    const uniqueDepositor = userTermAssetBalances.filter(item => parseInt(item?.shares || "") > 0).length;
    const assetBalanceMap = userAssetBalances.reduce((acc: any, balance: Partial<UserAssetBalance>) => {
      const token = balance.asset?.id;
      if (token) {
        acc[token] = balance;
      }
      return acc;
    }, {});
    const userTermAssets = userTermAssetBalances
      .filter(item => item?.user?.id === address)
      .reduce((acc: any[], termDeposit: Partial<UserTermAssetBalance>) => {
        const token = termDeposit.asset?.id;
        const userAssetBalance = token ? assetBalanceMap[token] : undefined;

        if (userAssetBalance && userAssetBalance.shares && BigInt(userAssetBalance.shares) > BigInt(0)) {
          const assetValue =
            (BigInt(termDeposit.shares || "0") * BigInt(userAssetBalance.assets || "0")) /
            BigInt(userAssetBalance.shares);

          const existingToken = acc.find(item => item.token === token);

          if (existingToken) {
            existingToken.assetValue += assetValue;
            existingToken.shares += BigInt(termDeposit.shares || "0");
          } else {
            acc.push({
              token,
              assetValue,
              shares: BigInt(termDeposit.shares || "0"),
            });
          }
        }

        return acc;
      }, []);

    const termAssets = term.assetBalances.map(item => ({
      shares: BigInt(item.shares || 0),
      assetId: item.asset.id,
    }));

    const totalDeposit = term.assetBalances.reduce((acc: bigint, balance: TermAssetBalance) => {
      const totalShares = BigInt(balance.asset.totalShares || 0);
      if (totalShares > 0) {
        const assetValue = (BigInt(balance.shares || 0) * totalShares) / totalShares;
        return acc + assetValue;
      }
      return acc;
    }, BigInt(0));

    const totalLoaned = term.loanBalances.reduce((acc: bigint, balance: TermLoanBalance) => {
      return acc + BigInt(balance.assets);
    }, BigInt(0));

    return {
      lenderName: term.lender.username,
      comission: term.comission,
      termAssets: termAssets,
      totalDeposit: totalDeposit,
      totalLoaned: totalLoaned,
      userTermAssets: userTermAssets,
      uniqueDepositor: uniqueDepositor,
    };
  };
  const aggregatedData = data?.term
    ? aggregateData(data.term, data.userTermAssetBalances, data.userAssetBalances)
    : undefined;
  return { aggregatedData };
};

export default useTermData;
