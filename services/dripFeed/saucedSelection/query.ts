import { gql } from "@apollo/client";

export const GET_SNEAKERS_BY_DISPLAY_GROUP = gql`
query getSneakersByDisplayGroup($displayGroup: DisplayGroup) {
    values: sneakers(where: {displayGroup: $displayGroup}, stage: PUBLISHED) {
        sneaker {
        results
        {
            brand
            name
            sku
            gender
            releaseDate
            colorway
            name
            retailPrice
            releaseYear
            retailPrice
            estimatedMarketValue
            image {
            original
            }
            links {
            stockX
            stadiumGoods
            flightClub
            }
        }
        }
    }
}`;