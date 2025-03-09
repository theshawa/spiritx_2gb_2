import { Player } from "./player";
import { PlayerTeam } from "./player-team";
import { Team } from "./team";
import { User } from "./user";

export const associateModels = () => {
  User.hasMany(Team, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
  Team.belongsTo(User);

  Team.belongsToMany(Player, {
    through: PlayerTeam,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
  Player.belongsToMany(Team, {
    through: PlayerTeam,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};
