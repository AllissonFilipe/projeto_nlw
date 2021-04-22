import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUsersCreate {
    email: string;
}

class UsersService {
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create({ email }: IUsersCreate) {

        const emailAlreadyExists = await this.usersRepository.findOne({
            email
        });

        if(emailAlreadyExists) {
            return emailAlreadyExists;
        }

        const user = this.usersRepository.create({
            email,
        })

        await this.usersRepository.save(user);

        return user;
    }
}

export { UsersService };