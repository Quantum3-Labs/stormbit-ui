import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import "./ModalBorrow.css";
import { Select, SelectItem } from "@nextui-org/react";
import BorrowInput from "~~/components/BorrowInput/BorrowInput";
import CustomCheckbox from "~~/components/CustomCheckbox/CustomCheckbox";
import PaymentSchedule from "~~/components/PaymentSchedule/PaymentSchedule";

interface ModalProps {
  setIsModalOpen: () => void;
}

const ModalBorrow: React.FC<ModalProps> = ({ setIsModalOpen }) => {
  const [selectedView, setSelectedView] = useState("borrow");
  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const [reason, setReason] = useState("");

  const handleViewChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedView(event.target.value);
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value);
  };

  const handleReasonChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value);
  };

  return (
    <div className="container-modal">
      <div className="content-modal">
        <div className="flex gap-20 border-b-1 border-[#374B6D] pb-6 justify-between">
          <div>
            <span>Borrow</span>
          </div>
          <div className="flex gap-4 max-w-[180px] w-full text-white">
            <Select
              radius="md"
              defaultSelectedKeys={["borrow"]}
              className="text-white border border-[#374B6D] rounded-[14px] bg-transparent"
              onChange={handleViewChange}
              classNames={{
                base: "base",
                description: "text-white",
                errorMessage: "errorMesage",
                label: "label text-white",
                value: "value text-white",
                mainWrapper: "mainWrapper",
                trigger: "trigger bg-transparent py-8 text-white",
                innerWrapper: "inner text-white",
                selectorIcon: "slectorIcon",
                spinner: "spinner",
                listboxWrapper: "listboxWrapper",
                listbox: "flex text-white",
                popoverContent: "bg-[#17172B] border border-[#374B6D]",
              }}
            >
              <SelectItem
                key="borrow"
                value="borrow"
                classNames={{
                  base: ["data-[selectable=true]:focus:bg-[#25253E] text-white"],
                }}
              >
                Borrow
              </SelectItem>
              <SelectItem
                key="repay"
                value="repay"
                classNames={{
                  base: ["dark:data-[hover=true]:text-white", "data-[selectable=true]:focus:bg-[#25253E] text-white"],
                }}
              >
                Repay
              </SelectItem>
            </Select>
          </div>
        </div>
        <div className="content">
          {selectedView === "borrow" && (
            <div className="mt-8">
              <BorrowInput />
              <PaymentSchedule label="Payment Schedule" />
              <div className="flex flex-col flex-1 gap-4 mt-5">
                <label htmlFor="campo3">Penalty</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="campo1"
                    name="campo1"
                    className="w-full p-2 bg-transparent border-[#374B6D] focus:outline-none rounded-[14px]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                <span>Agreement supported</span>
                <div className="flex gap-16">
                  <CustomCheckbox
                    isSelected={selectedCheckbox === "Simple"}
                    isDisabled={selectedCheckbox == "Simple"}
                    onClick={() => handleCheckboxChange("Simple")}
                  >
                    Simple Agreement
                  </CustomCheckbox>
                  <CustomCheckbox
                    isSelected={selectedCheckbox === "ERC721"}
                    isDisabled={selectedCheckbox == "ERC721"}
                    onClick={() => handleCheckboxChange("ERC721")}
                  >
                    ERC721 Agreement
                  </CustomCheckbox>
                  <CustomCheckbox
                    isSelected={selectedCheckbox === "ERC20"}
                    isDisabled={selectedCheckbox == "ERC720"}
                    onClick={() => handleCheckboxChange("ERC20")}
                  >
                    ERC20 Agreement
                  </CustomCheckbox>
                </div>
              </div>
              {selectedCheckbox === "Simple" && (
                <>
                  <div className="flex flex-col flex-1 gap-4 mt-5">
                    <label htmlFor="TypeBorrow">Type</label>
                    <div className="flex items-center w-full border border-[#374B6D] rounded-[14px] bg-transparent">
                      <Select
                        defaultSelectedKeys={["Select type"]}
                        style={{ marginLeft: "8px", maxWidth: "100px" }}
                        className="focus:outline-none  border-none w-full "
                        classNames={{
                          description: "descriptiom",
                          errorMessage: "errorMesage",
                          label: "label text-white",
                          base: "baseSelect ",
                          value: "value",
                          mainWrapper: "mainWrapper",
                          trigger: "trigger bg-transparent py-8 ",
                          innerWrapper: "inner text-white",
                          selectorIcon: "slectorIcon",
                          spinner: "spinner",
                          listboxWrapper: "listboxWrapper",
                          listbox: "flex border-red-700",
                          popoverContent: "bg-[#17172B] border border-[#374B6D]",
                        }}
                        // classNames="focus:outline-none  border-none w-full "
                        color={"primary"}
                      >
                        <SelectItem key="01" value="01">
                          Bussines
                        </SelectItem>
                        <SelectItem key="02" value="02">
                          Personal
                        </SelectItem>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 gap-4 mt-5">
                    <label htmlFor="Reason">Reason</label>
                    <div className="flex items-center ">
                      <textarea
                        className="w-full p-2 bg-transparent border border-[#374B6D] rounded-[14px] focus:outline-none"
                        placeholder="Write Reason"
                        value={reason}
                        onChange={handleReasonChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <Button onClick={() => setIsModalOpen()}>Borrow Dai</Button>
      </div>
    </div>
  );
};

export default ModalBorrow;
