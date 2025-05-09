import Sequelize, { Model } from "sequelize";

export default class Aluno extends Model {
    static init(sequelize) {
        super.init({
            nome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Campo nome deve ter entre 3 e 255 caracteres'
                    }
                }
            },
            sobrenome: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres'
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'Email já cadastrado'
                },
                validate: {
                    isEmail: {
                        msg: 'Email inválido'
                    }
                }
            },
            idade: {
                type: Sequelize.INTEGER,
                defaultValue: '',
                validate: {
                    isInt: {
                        msg: 'Idade precisa ser um número inteiro'
                    },
                    min: {
                        args: [0],
                        msg: 'Idade não pode ser negativa'
                    }
                }
            },
            peso: {
                type: Sequelize.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'Peso precisa ser um número'
                    },
                    min: {
                        args: [0],
                        msg: 'Peso não pode ser negativo'
                    }
                }
            },
            altura: {
                type: Sequelize.FLOAT,
                defaultValue: '',
                validate: {
                    isFloat: {
                        msg: 'Altura precisa ser um número'
                    },
                    min: {
                        args: [0],
                        msg: 'Altura não pode ser negativa'
                    }
                }
            }
        }, {
            sequelize,
        })
        return this;
    }

    static associate(models) {
        this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
    }
}