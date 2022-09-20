import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { marketsDataGit, OrderBookGit, urlBySku } from './constants';

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

const specializedMarketFetcher = (url, index, sku) =>
	axios.get(url).then((res) => {
		const test = res.data[3][cardObject?.sku];
		setCurrentMarket(test);
		const expires = new Date(test?.expiration * 1000).toLocaleDateString(
			'en-US'
		);
		setExpiration(expires);
		console.log({ testing: test });
	});

export const useGetSneaker = (sku) => {
	const urlWithSku = urlBySku + sku;

	const { data, error } = useSWR(urlWithSku, fetcherFirstResult);

	console.log('useRequest', data);
	return { data, error };
};

const getMarketbySku = async (index, sky) => {
	const { data, error } = useSWR(urlWithSku, fetcherFirstResult);
	const req = axios.get(
		'https://raw.githubusercontent.com/xsauce-io/MarketInfo/main/marketsData.json'
	);
	req.then((res) => {
		const test = res.data[3][cardObject?.sku];
		setCurrentMarket(test);
		const expires = new Date(test?.expiration * 1000).toLocaleDateString(
			'en-US'
		);
		setExpiration(expires);
		console.log({ testing: test });
	});

	// setCurrentMarket()
};

export const requestOrderBook = () => axios.get(OrderBookGit);
export const requestOrderBookAddress = () => axios.get(OrderBookAddressGit);
