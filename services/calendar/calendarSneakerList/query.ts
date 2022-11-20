import { gql } from "@apollo/client";

export const GET_SNEAKER_COLLECTION_BY_TITLE = gql`
    query getSneakerCollectionByTitle($title: String!) {
        values: sneakerCollection(where: { title: $title}, stage:  PUBLISHED) {
            sneakers {
            count
            results{
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
    }
`