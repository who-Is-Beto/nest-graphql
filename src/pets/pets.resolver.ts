import { Pet } from './pet.entity';
import {
  Args,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Query } from '@nestjs/graphql';
import { CreatePetInput } from './dto/createPetInput.dto';
import { Owner } from 'src/owners/entities/owner.entity';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petService: PetsService) {}

  @Query((returns) => [Pet])
  public async pets(): Promise<Pet[]> {
    return this.petService.findAll();
  }

  @Mutation((returns) => Pet)
  public async createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    const myPet = await this.petService.createPet(createPetInput);
    return myPet;
  }

  @ResolveField((returns) => Owner)
  public async owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petService.getOwner(pet.ownerId);
  }

  @Query((returns) => Pet)
  public async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Pet> {
    return this.petService.findOne(id);
  }
}
