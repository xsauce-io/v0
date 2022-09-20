import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { marketsDataGit, OrderBookGit, urlBySku } from './constants';

// ----------------------- Fetchers ----------------------

function fetcher(url) {
	return axios.get(url);
}

const fetcherFirstResult = (url) =>
	axios
		.get(url)
		.then(function (response) {
			let res = response.data.results;
			console.log(response.data.results);
			return response.data.results[0];
			//return { data: res, error: undefined };
		})
		.catch(function (error) {
			console.error(error);
			return error;
		});

const specializedMarketFetcher = (url, sku) =>
	axios
		.get(url)
		.then((res) => {
			const data = res.data[3][sku];

			const expires = new Date(data?.expiration * 1000).toLocaleDateString(
				'en-US'
			);

			console.log(data);
			data.expiration = expires;
			console.log(data);
			return data;
		})
		.catch(function (error) {
			console.error(error);
			return error;
		});

// ----------------------- useRequests ----------------------

export const useGetSneaker = (sku) => {
	const urlWithSku = urlBySku + sku;

	const { data, error } = useSWR(urlWithSku, fetcherFirstResult);

	console.log('useRequest', data);
	return { data, error };
};

export const useGetMarketBySku = (sku) => {
	const { data, error } = useSWR(
		[marketsDataGit, sku],
		specializedMarketFetcher
	);
	console.log('useRequest market data ', data);

	return { data, error };
};

export const requestOrderBook = () => axios.get(OrderBookGit);
export const requestOrderBookAddress = () => axios.get(OrderBookAddressGit);
