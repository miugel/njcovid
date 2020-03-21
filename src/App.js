import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AppContainer = styled.div`
	header {
		margin-top: 32px;

		h1 {
			margin-bottom: 8px;
			color: #ffffff;
			line-height: 32px;
			text-align: center;
		}

		p {
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
			.recent-news {
				margin-bottom: 64px;

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
			}

			.twitter {
				h2 {
					margin-bottom: 16px;
					color: #ffffff;
					line-height: 32px;
					text-align: center;
				}
			}

			.resources {
				margin-bottom: 16px;
				color: #ffffff;
				text-align: center;
			}
		}
	}

	footer {
		height: 72px;
		display: flex;
		justify-content: center;
		align-items: center;

		p {
			font-size: 0.875rem;
			color: #ffffff;
		}
	}
`;

const App = () => {
	const [results, setResults] = useState([]);
	const [error, setError] = useState([]);

	useEffect(() => {
		axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAF1K_C4WCkYeYCc8CZwxymVcwAF5bYxYc&cx=006689534815398166742:yurca9jsngp&q=new+jersey+coronavirus`)
			.then(response => setResults(response.data.items))
			.catch(error => {
				setError('There was an error');
				console.log(error);
			});
	},  []);

	return (
		<AppContainer>
			<header>
				<h1>Coronavirus in New Jersey</h1>
				<p>Last updated March 20, 2020</p>
			</header>

			<body>
				<section className='statistics'>
					<div className='statistic'>
						<h2><i className="fas fa-biohazard"></i>Total Confirmed Cases</h2>
						<h2>890 cases</h2>
						<p>Up <b>148</b> from yesterday</p>
					</div>
					<div className='statistic'>
						<h2><i className="fas fa-skull-crossbones"></i>Total Deaths</h2>
						<h2>11 deaths</h2>
						<p>Up <b>2</b> from yesterday</p>
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
									</div>
								</a>
							))
						) : <div className='spinning-wheel'></div>}
					</div>

					<div className='twitter'>
						<h2>Announcements from Governer Phil Murphy</h2>
						<a className='twitter-timeline' data-theme='dark' href='https://twitter.com/GovMurphy?ref_src=twsrc%5Etfw'>Tweets by GovMurphy</a>
					</div>

					{/* <div className='resources'>
						<h2>Resources</h2>
					</div> */}
				</section>
			</body>

			<footer>
				<p>Built by Miguel</p>
			</footer>
		</AppContainer>
	);
};

export default App;
