import { useQuery } from "@apollo/client";
import { USER_ASSET_BALANCE_QUERY } from "~~/utils/gql";
import { UserAssetBalance } from "~~/utils/gql/types";

interface UserAssetBalanceQueryData {
  userAssetBalances: Partial<UserAssetBalance>[];
}

const useUserAssetBalance = (address: string | undefined) => {
  const { loading, error, data } = useQuery<UserAssetBalanceQueryData>(USER_ASSET_BALANCE_QUERY(address || ""), {
    pollInterval: 3000,
    notifyOnNetworkStatusChange: true,
  });

  const totalShares =
    data?.userAssetBalances?.reduce((acc, balance) => acc + BigInt(balance.shares || 0), BigInt(0)) || BigInt(0);

  return {
    userAssetBalances: data,
    totalShares,
    loading,
    error,
  };
};

export default useUserAssetBalance;
