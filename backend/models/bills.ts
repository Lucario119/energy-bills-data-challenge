import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { BillData } from '../src/@types/BillData';

export interface BillAttributes extends BillData {
  id: string;
}

interface BillCreationAttributes extends Optional<BillAttributes, 'id'> {}

class Bill extends Model<BillAttributes, BillCreationAttributes> implements BillAttributes {
  public id!: string;
  public clientNumber!: string;
  public referenceMonth!: string;
  public electricityConsumption!: string;
  public electricityCost!: string;
  public sceeConsumption!: string;
  public sceeCost!: string;
  public compensatedEnergyConsumption!: string;
  public compensatedEnergyCost!: string;
  public publicLightingContribution!: string;
}

Bill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clientNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referenceMonth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    electricityConsumption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    electricityCost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sceeConsumption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sceeCost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compensatedEnergyConsumption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compensatedEnergyCost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicLightingContribution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'bills',
  }
);

export default Bill;
