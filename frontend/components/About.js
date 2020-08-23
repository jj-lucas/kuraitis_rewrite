import React from 'react'
import styled from 'styled-components'
import { useContext } from 'react'
import LanguageContext from '../lib/languageContext'

const Picture = styled.img`
	display: block;

	margin: auto;
	max-width: 100%;

	@media (min-width: ${props => props.theme.breakpoints.sm}) {
		float: right;

		margin: 20px;
	}
`

const About = () => {
	const language = useContext(LanguageContext)

	if (language === 'da') {
		return (
			<div>
				<h1>Sergio Kuraitis - en livslang passion for godt design</h1>
				<p>
					<em>
						Fra markedspladser i Argentina til inspirerende passion for italienske håndværk, til hjemsted for høj
						designkvalitet i Danmark - udviklingen af et flot produkt er fortsat Sergio Kuraitis' livsværk.
					</em>
				</p>
				<p>
					<Picture src="/images/sergio.jpg" />
				</p>
				<p>
					Jeg blev født i Buenos Aires, en hektisk kæmpeby, hvor udenlandsk modernisme mødte indfødte traditioner. Som
					barn var jeg tiltrukket af naturen og kreative aktiviteter, og jeg holdt af at tilbringe tid i min bedstefars
					møbelsnedkeri. I min ungdom kunne jeg finde på at bygge underlige kreationer i et improviseret værksted ved
					mine forældres hus. Min interesse for hvordan ting fungerer, fik mig til at studere design på universitetet,
					og hele mit liv er jeg fortsat med at udforske og forny designløsninger i mit arbejde som håndværker.
				</p>
				<p>
					I starten solgte jeg mine produkter på små weekendmarkeder i Argentina. Efter jeg flyttede til Italien med min
					familie, arbejdede jeg hårdt for at forfølge min passion og videreudvikle min kunnen, for at skabe en
					forretning, samtidig med at jeg arbejdede på fuld tid. I vores lille lejlighed eksperimenterede jeg med
					forskellige materialer, og besluttede mig for at satse på læder, da det giver mange muligheder - det var også
					et meget traditionelt og populært materiale i Italien.
				</p>
				<p>
					Med hjælp fra min familie, begyndte vi at sælge vores produkter på et marked og vi flyttede til et større hus,
					hvor jeg byggede et værksted i garagen, så jeg kunne eksperimentere og fortsætte med at forfine mine metoder.
				</p>
				<p>
					Optændt af nye ideer og en passion for konstante forbedringer, begyndte jeg at arbejde med naturlæder og
					producerede mere unikke og individuelle produkter, der tiltrak mange flere kunder og tillod mig at deltage på
					internationale markeder.
				</p>
				<p>
					Da vore børn afsluttede gymnasiet, flyttede vi til Danmark, som vi valgte på grund af dets stabilitet og
					mulighederne for at bygge en fremtid for os alle, herunder den fortsatte vækst indenfor mit fag. Nu har jeg
					min egen personlige stil, med et professionelt værksted og sælger mine produkter på markeder med varer af høj
					kvalitet, samt via min hjemmeside.
				</p>
				<p>
					Gennem hvert trin af min rejse, har jeg haft støtte fra min familie, som har hjulpet mig med at skabe vækst i
					en virksomhed, som vi alle kan være stolte af.
				</p>
				<h3>Kontinuerlig forbedring og en forpligtelse til kvalitet</h3>
				<p>
					Design er min passion og jeg er mest lykkelig, når jeg skaber et nyt produkt, som skal opfylde nogle særlige
					behov, ofte ting til mit eget personlige brug. Jeg styrer hele processen, fra den indledende idé til salg.
					Herunder fremstilling af prototyper til testning, idet jeg eksperimenterer både med materialer og
					fremstillingsteknikker; afprøvning hos klienter, samt eventuelle designændringer, før det endelige produkt
					nås. Jeg har altid været inspireret af det japanske Kaizen-princip om løbende forbedringer, som jeg forsøger
					at anvende i alt, hvad jeg gør.
				</p>
				<p>
					Jeg arbejder især med kernelæder og kombinerer det med andre naturmaterialer, som uld, træ og kork. Jeg bruger
					vandbaserede klæbestoffer, der er ugiftige, og jeg bruger kun syntetiske materialer, når det er absolut
					nødvendigt. Jeg søger for øjeblikket efter nye organiske materialer, der over tid vil være et alternativ til
					naturlæder.
				</p>
				<p>
					Jeg har kunder over hele verden. Lige fra dem, der handler på markeder her i Danmark, til folk, der handler på
					nettet fra deres hjem, som kan ligge i Nordamerika, Storbritannien, Centraleuropa, Skandinavien og så langt
					væk som i Asien og Australien.
				</p>
				<p>
					Jeg er altid stolt af at høre fra folk, som har haft et af mine produkter i mange år, og de fortæller mig,
					hvor tilfredse de er med kvaliteten, som har holdt længere tid end de forventede. Jeg føler stor glæde ved at
					høre om den store påskønnelse fra min online-kunder, når de får et af mine produkter i hænderne - det fylder
					mig med glæde at vide, at de vil bruge det med stolthed.
				</p>
				<p>
					Jeg har været håndværker hele mit liv, og hver ting, jeg fremstiller, er inspireret af min opdagelsesrejse som
					designer. Når du køber et af mine produkter, køber du ikke kun varig kvalitet og udsøgt design, men noget, der
					er mit livsværk.
				</p>
			</div>
		)
	}
	return (
		<div>
			<h1>Sergio Kuraitis – a lifelong passion for good design</h1>
			<p>
				<em>
					From the marketplaces of Argentina to the inspiring passion of Italian craftsmanship, to the home of high
					quality design in Denmark – the evolution of a beautiful product continues to be Sergio Kuraitis’ life’s work.
				</em>
			</p>
			<p>
				<Picture src="/images/sergio.jpg" />
			</p>
			<p>
				I was born in Buenos Aires, a feverish mega city where foreign modernism met native traditions. As a child I was
				drawn to nature and creative activities and I liked to spend time in my grandfather’s cabinetmaking workshop. In
				my adolescence I could be found building strange gadgets in an improvised laboratory at my parents’ house. My
				interest in how things worked led me to study design at university and throughout my life I have continued to
				explore and innovate design solutions in my work as a craftsman.
			</p>
			<p>
				In the beginning I sold my products at small weekend markets in Argentina. After moving to Italy with my family,
				I worked hard to pursue my passion and further develop my craft into a business while also working full time. In
				our small apartment I experimented with different materials, deciding to focus on the use of leather as it
				offered many possibilities – it was also a very traditional and popular material in Italy.
			</p>
			<p>
				With the help of my family, we started to sell our products in a market and moved into a bigger house where I
				built a laboratory in the garage so that I could experiment and continue to refine my methods.
			</p>
			<p>
				Fuelled by new ideas and a passion for constant improvement, I began to work with natural leather, producing a
				more unique and individual product which attracted many more clients and allowed me to participate in
				international markets.
			</p>
			<p>
				When our children were ready to start college, we moved to Denmark, choosing it for its stability and the
				possibilities to build a future for us all, including the further growth of my craft. Now I have my own personal
				style, with a professional workshop and I sell at high quality craft markets as well as through my webshop.
			</p>
			<p>
				At every stage of my journey, I have had the support of my family who have helped me to grow a business of which
				we can all be proud.
			</p>
			<h3>Continuous improvement and a commitment to quality</h3>
			<p>
				Design is my passion and I feel happiest when I am creating a new product to satisfy some special need, often
				things for my own personal use. I manage the whole process, from the initial idea through to the sale, including
				the production of prototypes for testing, experimenting with materials and techniques of manufacture, client
				testing and redesigns, before reaching the final product. I have always been inspired by the Japanese ‘Kaizen’
				principle of continuous improvement, which I try to apply in everything I do.
			</p>
			<p>
				I mainly work with natural leather and combine it with other natural materials like wool, wood and cork. I also
				use water-based adhesives that are non-toxic and I only use synthetic materials when it is absolutely necessary.
				I am currently researching new organic materials that, over time will offer an alternative to natural leather.
			</p>
			<p>
				My clients are all over the world, from those buying at markets here in Denmark to people shopping online from
				their homes across North America, the UK, Central Europe, Scandinavia, and as far away as Asia and Australia.
			</p>
			<p>
				I am always proud to hear from people who have had one of my products for many years and they tell me how
				pleased they are with the quality that has lasted beyond their expectations. I take enormous pleasure in hearing
				the heartfelt appreciation from my online customers once they are holding one of my products in their hands – it
				fills me with joy to know that they will carry it with pride.
			</p>
			<p>
				I have been a craftsman all my life and every piece that I create is inspired by my journey of discovery as a
				designer. My collection not only exemplifies enduring quality and meticulous design, it represents my life’s
				work.
			</p>
		</div>
	)
}

export default About
