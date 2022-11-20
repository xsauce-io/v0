import { gql } from '@apollo/client';

export const GET_SNEAKER_BY_TITLE = gql`
        query getSneakerByTitle($title: String!) {
					values: sneaker(where: {title: $title}, stage: PUBLISHED) {
						sneaker {
						count
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
			}

`
