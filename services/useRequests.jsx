import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { marketsDataGit, OrderBookGit, urlBySku } from './constants';

// ----------------------- ----------- ----------------------
// ----------------------- Fetchers ----------------------
// ----------------------- ----------- ----------------------

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

			if (expires === undefined) {
				data.expiration = '';
			} else {
				data.expiration = expires;
			}
			console.log(data);
			return data;
		})
		.catch(function (error) {
			console.error(error);
			return error;
		});

const fetcherMultiCalls = (arrayUrl) => {
	let data = [];
	let error;
	let promises = [];
	for (let i = 0; i < arrayUrl.length; i++) {
		promises.push(
			axios.get(arrayUrl[i]).then((response) => {
				data.push(response.data.results[0]);
			})
		);
	}

	Promise.all(promises)
		.then(() => {
			return data;
		})
		.catch(function (err) {
			console.error(err);
			error = err;
			return error;
		});

	return data;
};

// ----------------------- ----------- ----------------------
// ----------------------- useRequests ----------------------
// ----------------------- ----------- ----------------------

export const useGetSneaker = (sku) => {
	const urlWithSku = urlBySku + sku;

	const { data, error } = useSWR(urlWithSku, fetcherFirstResult);

	console.log('useRequest', data);
	return { data, error };
};

export const useGetMultiSneakers = (skuArray) => {
	const skuUrls = [];
	for (let i = 0; i < skuArray.length; i++) {
		let skuUrl = urlBySku + skuArray[i];
		skuUrls.push(skuUrl);
	}
	console.log(skuUrls);
	const { data, error, isValidating } = useSWR([skuUrls], fetcherMultiCalls);
	console.log('get multi data', data);

	return { data, error, isValidating };
};

export const useGetMarketBySku = (sku) => {
	const { data, error } = useSWR(
		[marketsDataGit, sku],
		specializedMarketFetcher
	);
	console.log('useRequest market data', data);

	return { data, error };
};

export const requestOrderBook = () => axios.get(OrderBookGit);
export const requestOrderBookAddress = () => axios.get(OrderBookAddressGit);
