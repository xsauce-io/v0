export const TopStories = () => {

  const scrollLeft = () => {
    const input = document.getElementById('container')
    const scrollAmount = input.clientWidth;
  
    document.getElementById('container').scrollLeft += scrollAmount;
  }
  
  const scrollRight = () => {
    const input = document.getElementById('container')
    const scrollAmount = input.clientWidth;
  
    document.getElementById('container').scrollLeft -= scrollAmount;
  }

	return (
		<div className="block relative pb-10">
			<div className="flex overflow-auto scrollbar-hide scroll-smooth rounded-lg" id="container">
				<div className="flex flex-row font-SG text-lg space-x-2">
					<a
						className="flex flex-col mobile:w-[300px] tablet:w-[450px] text-left "
						target="blank"
						href="https://hypebeast.com/2022/10/hublot-cooks-damascus-steel-big-bang-unico-gourmet-chef"
					>
						<img
							src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F10%2Fhublot-cooks-damascus-steel-big-bang-unico-gourmet-chef-01.jpg?q=90&w=1400&cbr=1&fit=max"
							className="w-full mobile:h-[250px] tablet:h-[300px] bg-black"
						/>
						<span className="pt-4">
							Hublot Cooks Up A Treat With Damascus Steel Big Bang Unico Gourmet
						</span>
					</a>

					<a
						className="flex flex-col mobile:w-[300px] tablet:w-[450px] text-left "
						target="blank"
						href="https://www.linkedin.com/posts/xsauce_culture-team-markets-activity-6985365771354861568-Jok1?utm_source=share&utm_medium=member_desktop"
					>
						<img
							className="object-contain w-full mobile:h-[250px] tablet:h-[300px] bg-black "
							src="sauce.gif"
						/>
						<span className="pt-4">
							{' '}
							Xsauce's team releases their thesis on the future of investing in
							culture
						</span>
					</a>

					<a
						className="flex flex-col mobile:w-[300px] tablet:w-[450px] text-left "
						target="blank"
						href="https://www.modern-notoriety.com/adidas-yeezy-boost-350-v2-jade-ash-hq2060-release-date/"
					>
						<img
							src="https://www.modern-notoriety.com/wp-content/uploads/2022/09/adidas-yeezy-boost-350-v2-salt-core-black-HQ2060-release-date.jpg"
							className=" w-full mobile:h-[250px] tablet:h-[300px]  bg-black"
						/>
						<span className="pt-4">
							Yeezy Boost 350 V2 Dropping in Salt/Core Black
						</span>
					</a>

					<a
						className="flex flex-col mobile:w-[300px] tablet:w-[450px] text-left "
						target="blank"
						href="https://hypebeast.com/2022/10/hublot-cooks-damascus-steel-big-bang-unico-gourmet-chef"
					>
						<iframe
							className="mobile:h-[250px] tablet:h-[300px] "
							src="https://www.youtube.com/embed/JpGKWUdRnXE"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
						<span className="pt-4">Song of the Week</span>
					</a>

					<a
						className="flex flex-col mobile:w-[300px] tablet:w-[450px] text-left "
						target="blank"
						href="https://manofmany.com/fashion/sneakers/customise-your-own-nike-dunk-low"
					>
						<img
							className="object-cover w-full mobile:h-[250px] tablet:h-[300px] bg-black"
							src="https://static.nike.com/a/images/t_prod/w_1920,c_limit,f_auto,q_auto/243a7c32-0aa7-4c0c-a238-c2b91b91d67e/pdp-replace.jpg"
						/>
						<span className="pt-4">
							{' '}
							Nike ID is revamped with "Nike by You"
						</span>
					</a>

					<a
						className="flex flex-col mobile:w-[300px] tablet:w-[450px] text-left "
						target="blank"
						href="https://www.currencycrew.com/"
					>
						<img
							className="w-full mobile:h-[250px] tablet:h-[300px] bg-black"
							src="https://assets.bigcartel.com/product_images/324756408/0597FD68-35F9-4E9E-ADE6-58B791CCCDF5.jpeg?auto=format&fit=max&w=1200"
						/>
						<span className="pt-4">
							{' '}
							Atlanta based brand "Currency Crew" is making waves
						</span>
					</a>

					<a
						className="flex flex-col mobile:w-[300px] tablet:w-[450px] text-left"
						target="blank"
						href="https://www.sneakerfreaker.com/features/greatest-nike-air-force-1-releases-goat-spns"
					>
						<img
							src="https://cdn.sanity.io/images/c1chvb1i/production/3984bd83972c6598839d5367ecd17d49866e8dfe-1200x630.jpg"
							className="w-full mobile:h-[250px] tablet:h-[300px] bg-black"
						/>
						<span className="pt-4">
							The greatest nike air force 1s from over the decades
						</span>
					</a>
				</div>
				<div className="w-[50px] mobile:h-[250px] tablet:h-[300px] absolute top-0 left-0 flex flex-col justify-center items-center "> <button className="w-full flex flex-row justify-center items-center" onClick={scrollRight}><img className="w-[70%]" src="/leftBubble.svg"/></button></div>
				<div className="w-[50px] mobile:h-[250px] tablet:h-[300px] absolute top-0 right-0 flex flex-col justify-center items-center">   <button className="w-full flex flex-row justify-center items-center" onClick={scrollLeft}><img className="w-[70%]" src="/rightBubble.svg"/></button></div>
			</div>
		</div>
	);
}
