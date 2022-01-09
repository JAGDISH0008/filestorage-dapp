import { ethers } from "hardhat";

async function main() {

  const FileStorage = await ethers.getContractFactory("FileStorage");
  const fileStorageContract = await FileStorage.deploy();

  await fileStorageContract.deployed();

  console.log("fileStorageContract deployed to:", fileStorageContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
