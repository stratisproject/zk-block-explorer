import { Injectable } from "@nestjs/common";
import { BlockchainService } from "../blockchain/blockchain.service";
import { AddressRepository } from "../repositories";
import { In } from "typeorm";

@Injectable()
export class SystemContractService {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly blockchainService: BlockchainService
  ) {}

  public async addSystemContracts(): Promise<void> {
    const systemContracts = SystemContractService.getSystemContracts();
    // const genesisContracts = await this.blockchainService.getGenesisContracts();
    const genesisContracts = [];
    const allSystemContracts = genesisContracts.concat(
      systemContracts.map((c) => ({ address: c.address, code: null }))
    );
    const existingContracts = await this.addressRepository.find({
      where: {
        address: In(allSystemContracts.map((contract) => contract.address)),
      },
      select: {
        address: true,
      },
    });

    for (const contract of allSystemContracts) {
      if (!existingContracts.find((existingContract) => existingContract.address === contract.address)) {
        const bytecode = contract.code || (await this.blockchainService.getCode(contract.address));
        // some contract might not exist on the environment yet
        if (bytecode !== "0x") {
          await this.addressRepository.upsert({
            address: contract.address,
            bytecode,
          });
        }
      }
    }
  }

  public static getSystemContracts() {
    return [
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000001",
      "0x0000000000000000000000000000000000000002",
      "0x0000000000000000000000000000000000000006",
      "0x0000000000000000000000000000000000000007",
      "0x0000000000000000000000000000000000000008",
      "0x0000000000000000000000000000000000008001",
      "0x0000000000000000000000000000000000008002",
      "0x0000000000000000000000000000000000008003",
      "0x0000000000000000000000000000000000008004",
      "0x0000000000000000000000000000000000008005",
      "0x0000000000000000000000000000000000008006",
      "0x0000000000000000000000000000000000008008",
      "0x0000000000000000000000000000000000008009",
      "0x000000000000000000000000000000000000800a",
      "0x000000000000000000000000000000000000800b",
      "0x000000000000000000000000000000000000800c",
      "0x000000000000000000000000000000000000800d",
      "0x000000000000000000000000000000000000800e",
      "0x000000000000000000000000000000000000800f",
      "0x0000000000000000000000000000000000008010",
      "0x0000000000000000000000000000000000008012",
      "0x0000000000000000000000000000000000000100",
      "0x0000000000000000000000000000000000008011",
      "0x0000000000000000000000000000000000010000",
    ].map((addr) => ({ address: addr }));
  }
}
