const { v4: uuidv4 } = require("uuid");

module.exports = {
    up: async (queryInterface) => {
        const userEmail = "admin@dci.de";

        const user = await queryInterface.rawSelect(
            "users",
            {
                where: {
                    email: userEmail,
                },
            },
            ["user_id"]
        );

        if (user !== null) {
            const itemId1 = uuidv4();
            const itemId2 = uuidv4();

            await queryInterface.bulkInsert("freebies", [
                {
                    item_id: itemId1,
                    item: "Ball",
                    description: "My old football",
                    image: "https://example.com/football.jpg",
                    zip_code: "12345",
                    location: "My house",
                    category: "Sports",
                    user_id: user,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    item_id: itemId2,
                    item: "Cup",
                    description: "Colorful, not very used",
                    image: "https://images.pexels.com/photos/433199/pexels-photo-433199.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                    zip_code: "12345",
                    location: "My house",
                    category: "House_Garden",
                    user_id: user,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        } else {
            console.log(`User with email ${userEmail} does not exist.`);
        }
    },

    down: async (queryInterface) => {
        // Remove the seeded data if needed
        await queryInterface.bulkDelete("freebies", null, {});
    },
};
