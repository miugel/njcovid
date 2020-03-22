import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';

const AppContainer = styled.div`
	header {
		margin-top: 32px;

		h1 {
			margin-bottom: 4px;
			color: #ffffff;
			line-height: 32px;
			text-align: center;
		}

		.handle {
			font-size: 0.875rem;
			color: #ffffff;
			text-align: center;

			a {
				color: #ffffff;
				transition: 0.25s;

				:hover  {
					opacity: 0.75;
				}
			}
		}

		.last-updated {
			margin-bottom: 64px;
			font-size: 0.875rem;
			color: #ffffff;
			text-align: center;
		}
	}

	body {
		width: 90%;
		margin: 0 auto;

		.statistics {
			margin-bottom: 32px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.statistic {
				margin-bottom: 32px;

				h2 {
					font-size: 1.5rem;
					color: #ffffff;

					i {
						margin-right: 8px;
					}

					.fa-biohazard {
						color: #fbbc05;
					}

					.fa-skull-crossbones {
						color: #34a853;
					}

					.fa-heartbeat {
						color: #ea4335;
					}
				}

				h2:first-of-type {
					margin-bottom: 4px;
				}

				h2:last-of-type {
					margin-bottom: 4px;
					color: #7289da;
					text-align: center;
				}

				p {
					color: #ffffff;
					text-align: center;
				}
			}
		}

		.information {
			display: flex;
			flex-direction: column-reverse;

			.recent-news {
				height: 100vh;
				margin-bottom: 64px;
				overflow: auto;

				h2 {
					margin-bottom: 16px;
					font-size: 1.5rem;
					color: #ffffff;
					text-align: center;
				}
				a {
					text-decoration: none;

					.article {
						padding: 16px;
						margin-bottom: 16px;
						background: #2c2f33;
						border-radius: 3px;
						color: #ffffff;
						transition: 0.25s;

						h3 {
							margin-bottom: 4px;
						}

						.source {
							margin-top: 4px;
							font-size: 0.875rem;
						}

						:hover {
							opacity: 0.75;
						}
					}
				}

				.spinning-wheel {
                    height: 24px;
					width: 24px;
					margin: 0 auto;
                    border: 3px solid white;
                    border-top: 3px solid rgba(0, 0, 0, 0);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
				}
				
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
				}

				.limit {
					color: #ffffff;
					text-align: center;
				}
				
				::-webkit-scrollbar {
					width: 8px;
				}

				::-webkit-scrollbar-track {
					background-color: none;
				}

				::-webkit-scrollbar-thumb {
					background-color: #99aab5;
					border-radius: 9999px;
					opacity: 0.75;
				}
			}

			.twitter {
				height: 100vh;
				margin-bottom: 64px;
				overflow: auto;
				
				h2 {
					margin-bottom: 16px;
					color: #ffffff;
					line-height: 32px;
					text-align: center;
				}

				::-webkit-scrollbar {
					width: 8px;
				}

				::-webkit-scrollbar-track {
					background-color: none;
				}

				::-webkit-scrollbar-thumb {
					background-color: #99aab5;
					border-radius: 9999px;
				}
			}

			.resources {
				height: 100vh;
				margin-bottom: 64px;
				color: #ffffff;
				overflow: auto;
				
				h2 {
					margin-bottom: 16px;
					text-align: center;
				}

				h3 {
					margin-bottom: 4px;
				}

				a {
					color: #ffffff;
				}

				::-webkit-scrollbar {
					width: 8px;
				}

				::-webkit-scrollbar-track {
					background-color: none;
				}

				::-webkit-scrollbar-thumb {
					background-color: #99aab5;
					border-radius: 9999px;
				}
			}
		}
	}

	@media(min-width: 1024px) {
		body {
			width: 972.8px;

			.statistics {
				flex-direction: row;
				justify-content: space-between;
			}

			.information {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				div {
					width: 32%;
				}

				.recent-news {
					.article {
						width: 100%;
					}
				}
			}
		}
	}
`;

const App = () => {
	const [results, setResults] = useState([]);

	useEffect(() => {
		axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAF1K_C4WCkYeYCc8CZwxymVcwAF5bYxYc&cx=006689534815398166742:yurca9jsngp&q=new+jersey+coronavirus`)
			.then(response => setResults(response.data.items))
			.catch(error => console.log(error));
	},  []);

	return (
		<AppContainer>
			<header>
				<h1>Coronavirus in New Jersey</h1>
				<p className='handle'>Built by <a href='https://miguelnicolas.dev' target='_blank' rel='noopener noreferrer'>Miguel</a></p>
				<p className='last-updated'>Last updated March 21, 2020</p>
			</header>

			<body>
				<section className='statistics'>
					<div className='statistic'>
						<h2><i className="fas fa-biohazard"></i>Total Confirmed Cases</h2>
						<h2>1327 cases</h2>
						<p>Up <b>437</b> from yesterday</p>
					</div>
					<div className='statistic'>
						<h2><i className="fas fa-skull-crossbones"></i>Total Deaths</h2>
						<h2>16 deaths</h2>
						<p>Up <b>5</b> from yesterday</p>
					</div>
					<div className='statistic'>
						<h2><i className="fas fa-heartbeat"></i>Total Recovered</h2>
						<h2>0 recovered</h2>
						<p>Up <b>0</b> from yesterday</p>
					</div>
				</section>

				<section className='information'>
					<div className='recent-news'>
						<h2>Recent News</h2>
						{results.length > 0 ? (
							results.map((item, index) => (
								<a key={index} href={item.link} target='_blank' rel='noopener noreferrer'>
									<div className='article'>
										<h3>{item.title}</h3>
										<p>{item.snippet}</p>
										<p className='source'><i>Source: {item.displayLink}</i></p>
									</div>
								</a>
							))
						) : <p className='limit'>The Google API has hit its daily limit 😕</p>}
					</div>

					<div className='twitter'>
						<h2>Announcements from Governer Phil Murphy</h2>
						<a className='twitter-timeline' data-theme='dark' href='https://twitter.com/GovMurphy?ref_src=twsrc%5Etfw'>Tweets by GovMurphy</a>
					</div>

					<div className='resources'>
						<h2>Cases by County</h2>
						<ul style={{ listStylePosition: 'inside', marginBottom: '4px' }}>
							<li>Bergen: 362</li>
							<li>Middlesex: 116</li>
							<li>Essex: 107</li>
							<li>Hudson: 97</li>
							<li>Monmouth: 92</li>
							<li>Union: 81</li>
							<li>Passaic: 67</li>
							<li>Morris: 64</li>
							<li>Ocean: 62</li>
							<li>Somerset: 34</li>
							<li>Mercer: 30</li>
							<li>Burlington: 21</li>
							<li>Camden: 15</li>
							<li>Hunterdon: 14</li>
							<li>Gloucester: 6</li>
							<li>Sussex: 6</li>
							<li>Warren: 5</li>
							<li>Atlantic: 4</li>
							<li>Cape May: 2</li>
							<li>Cumberland: 1</li>
						</ul>
						<p style={{ marginBottom: '64px', fontSize: '0.875rem' }}><i>Source: nj.gov</i></p>

						<h2>Resources</h2>

						<h3>Simple Steps to Stop the Spread of COVID-19</h3>
						<ul style={{ listStylePosition: 'inside', marginBottom: '16px'}}>
							<li>Stay home</li>
							<li>Social distance yourself</li>
							<li>Wash your hands regularly</li>
							<li>Clean and disinfect surfaces</li>
							<li>Cover coughs and sneezes with a tissue</li>
						</ul>

						<h3>Unemployment</h3>
						<p style={{ marginBottom: '16px'}}>Those needing to apply for unemployment insurance or other benefits can apply online at <a href={'https://myunemployment.nj.gov/'} target='_blank' rel='noopener noreferrer'>myunemployment.nj.gov</a> or <a href={'http://myleavebenefits.nj.gov/'} target='_blank' rel='noopener noreferrer'>myleavebenefits.nj.gov</a>. Before applying, you are encouraged to visit <a href={'http://nj.gov/labor'} target='_blank' rel='noopener noreferrer'>nj.gov/labor</a> to determine whether you are eligible to apply for unemployment, temporary disability, family leave, or workers' compensation.</p>

						<h3>Testing</h3>
						<p style={{ marginBottom: '4px'}}>The New Jersey Poison Control Center and 211 have partnered with the state to provide information to the public on testing and related needs:</p>
						<ul style={{ listStylePosition: 'inside', marginBottom: '4px'}}>
							<li>New Jersey Department of Health 24 hour hotline: 1-800-222-1222</li>
							<li>Call: 2-1-1</li>
							<li>Call (24/7): 1-800-962-1253</li>
							<li>Text: NJCOVID to 898-211</li>
							<li>Text: your zip code to 898-211 for live text assistance</li>
						</ul>
						<p style={{ marginBottom: '16px'}}>A new drive-through testing site at Bergen Community College in Paramus opened at 8 a.m. on Friday.</p>

						<h3>Mental Health</h3>
						<p style={{ marginBottom: '4px'}}>If you're feeling stressed out, contact these hotlines before a crisis occurs. You'll speak to sensitive, trained volunteers who provide empathic listening and refer you to resources in your community.</p>
						<ul style={{ listStylePosition: 'inside', marginBottom: '16px'}}>
							<li>NJ HOPELINE: 1-855-654-6735 or <a href={'http://www.njhopeline.com/'} target='_blank' rel='noopener noreferrer'>njhopeline.com</a> </li>
							<li>NATIONAL SUICIDE PREVENTION LIFELINE: 1-800-273-TALK (8255) or <a href={'https://suicidepreventionlifeline.org/'} target='_blank' rel='noopener noreferrer'>suicidepreventionlifeline.org</a></li>
							<li>FAMILY HELPLINE: 1-800-THE-KIDS (843-5437), 24 hours a day – 7 days a week</li>
						</ul>

						<h3>Grocery Stores</h3>
						<p style={{ marginBottom: '16px'}}>While the governor has closed non-essential businesses, grocery stores are permitted to remain open. Some chains in New Jersey, such as ACME and Stop & Shop, have implemented special hours for those most at-risk during the growing outbreak of the coronavirus.</p>

						<h3>Business Impact</h3>
						<p style={{ marginBottom: '16px'}}>The coronavirus outbreak is already having a major impact on New Jersey businesses, forcing closures and even layoffs. The New Jersey Chamber has set up <a href='https://njchamber.com/news/nj-business-news/744-coronavirus-crisis-snap-survey-results' target='_blank' rel='noopener noreferrer'>a special page</a> designed to help local businesses navigate the crisis.</p>

						<h3>Food Assistance</h3>
						<p style={{ marginBottom: '16px'}}>New Jersey officials have provided <a href='https://www.nj211.org/dont-go-hungry-get-help?gclid=Cj0KCQjwjcfzBRCHARIsAO-1_OpykFe5ryVN-6HpBJWUgjaBQgJjj8BwUOz8fMbGKbUTH2jIpvmhvggaAuSBEALw_wcB' target='_blank' rel='noopener noreferrer'>guidance</a> for accessing emergency food assistance for residents at risk of hunger due to measures to slow the spread of coronavirus. Additionally, schools closed due to the coronavirus will continue to serve meals to students through the <a href='https://www.nj.gov/agriculture/divisions/fn/childadult/school_lunch.html' target='_blank' rel='noopener noreferrer'>National School Lunch Program</a>.</p>

						<h3>Voting</h3>
						<p style={{ marginBottom: '16px'}}>New Jersey residents can sign up online to vote by mail-in ballot in case the crisis continues through the June 2nd Primary. To sign up to vote by mail ballot, visit <a href='https://www.state.nj.us/state/elections/vote-by-mail.shtml' target='_blank' rel='noopener noreferrer'>here</a>.</p>

						<h3>Tax Questions</h3>
						<p style={{ marginBottom: '16px'}}>Treasury Secretary Steven Mnuchin said Tuesday that the tax payment deadline will be extended 90 days due to the coronavirus crisis. If you need answers to tax questions in New Jersey, visit <a href='https://www.state.nj.us/treasury/taxation/index.shtml/ota/eitc/ptr/questions/cbt/automaticextension2019.shtml' target='_blank' rel='noopener noreferrer'>here</a>.</p>

						<h3>Public Transit</h3>
						<p style={{ marginBottom: '16px'}}>NJ Transit has taken <a href='https://www.njtransit.com/var/var_servlet.srv?hdnPageAction=COVID19ProtectionTo' target='_blank' rel='noopener noreferrer'>steps</a> to address the ongoing coronavirus outbreak.</p>

						<h3>Online MVC Services</h3>
						<p style={{ marginBottom: '16px'}}>Motor Vehicle Commission agencies are closed for two weeks for in-person services, but you can access services online <a href='https://www.state.nj.us/mvc/online-services.html' target='_blank' rel='noopener noreferrer'>here</a>.</p>

						<p style={{ fontSize: '0.875rem' }}><i>Source: patch.com</i></p>
					</div>
				</section>
			</body>
		</AppContainer>
	);
};

export default App;
