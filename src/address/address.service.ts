import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Address } from "./entities/address.entity";
import { CreateAddressInput } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { District } from "../districts/entities/district.entity";
import { User } from "../users/entities/user.entity";
import { Building } from "../building/entities/building.entity";

@Injectable()
export class AddressesService {
  private readonly logger = new Logger(AddressesService.name);

  constructor(
    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,

    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Building)
    private readonly buildingRepo: Repository<Building>
  ) {}

  async create(input: CreateAddressInput): Promise<Address> {
    const address = this.addressRepo.create({
      street: input.street,
      house_number: input.house_number,
      postal_code: input.postal_code,
      lat: input.lat,
      lon: input.lon,
    });

    if (input.district_id) {
      const district = await this.districtRepo.findOne({
        where: { id: input.district_id },
      });
      if (!district) throw new BadRequestException("District not found");
      address.district = district;
    }

    if (input.user_id) {
      const user = await this.userRepo.findOne({
        where: { id: input.user_id },
      });
      if (!user) throw new BadRequestException("User not found");
      address.user = user;
    }

    if (input.building_ids?.length) {
      const buildings = await this.buildingRepo.find({
        where: { id: In(input.building_ids) },
      });
      address.buildings = buildings;
    }

    const saved = await this.addressRepo.save(address);
    this.logger.log(`Address created: ID ${saved.id}`);
    return saved;
  }

  async findAll(): Promise<Address[]> {
    return this.addressRepo.find({
      relations: ["district", "user", "buildings"],
    });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepo.findOne({
      where: { id },
      relations: ["district", "user", "buildings"],
    });
    if (!address) throw new NotFoundException("Address not found");
    return address;
  }

  async update(id: number, input: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id);

    if (input.district_id) {
      const district = await this.districtRepo.findOne({
        where: { id: input.district_id },
      });
      if (!district) throw new BadRequestException("District not found");
      address.district = district;
    }

    if (input.user_id) {
      const user = await this.userRepo.findOne({
        where: { id: input.user_id },
      });
      if (!user) throw new BadRequestException("User not found");
      address.user = user;
    }

    if (input.building_ids) {
      const buildings = await this.buildingRepo.find({
        where: { id: In(input.building_ids) },
      });
      address.buildings = buildings;
    }

    Object.assign(address, {
      street: input.street ?? address.street,
      house_number: input.house_number ?? address.house_number,
      postal_code: input.postal_code ?? address.postal_code,
      lat: input.lat ?? address.lat,
      lon: input.lon ?? address.lon,
    });

    const updated = await this.addressRepo.save(address);
    this.logger.log(`Address updated: ID ${updated.id}`);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    const address = await this.findOne(id);
    await this.addressRepo.remove(address);
    this.logger.log(`Address deleted: ID ${id}`);
    return true;
  }
}
