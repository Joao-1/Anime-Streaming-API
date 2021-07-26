module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('AnimeEpisodes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            AnimeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Animes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            name: {
                type: Sequelize.STRING,
            },
            episode: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            author: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('AnimeEpisodes');
    },
};
