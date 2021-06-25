
import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id,
      },  
      //Busca encadeada com relação a esses dados
      relations: ["userSender","userReceiver","tag"],
    });
    return compliments;
  }
}

export { ListUserSendComplimentsService };