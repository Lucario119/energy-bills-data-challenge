import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { FileAttributes } from '../src/@types/FileAttributes';

interface FileCreationAttributes extends Optional<FileAttributes, 'id'> {}

class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
  public id!: number;
  public name!: string;
  public type!: string;
  public data!: Buffer;
  public clientNumber!: string;
  public referenceMonth!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

File.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    clientNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    referenceMonth: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'files',
  }
);

export default File;
