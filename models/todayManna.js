import Sequelize from 'sequelize';

module.exports = class TodayManna extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          unique: true,
          primaryKey: true,
          defaultValue: Sequelize.NOW,
        },
        verse: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        contents: {
          type: Sequelize.ARRAY(Sequelize.TEXT),
          allowNull: false,
        },
      },
      {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'todayManna',
        tableName: 'today_manna',
      },
    );
  }
  static associate(db) {}
};
