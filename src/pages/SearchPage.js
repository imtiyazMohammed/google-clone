import React from 'react';
import './SearchPage.css'
import { useStateValue } from '../StateProvider';
import UseGoogleSearch from '../UseGoogleSearch'
import Response from '../Response';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RoomIcon from '@material-ui/icons/Room';
import MoreVertIcon from '@material-ui/icons/MoreVert';


function SearchPage() {
    const [{ term }, dispatch] = useStateValue()

    // LIVE API CALL
    const {data} = UseGoogleSearch(term)

    // MOCK API
    // const data = Response;
    return (
        <div className='searchPage'>
            <div className='searchPage__header'>
                <Link to='/'>
                    <img className="searchPage__logo" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="" />
                </Link>
                <div className='searchPage__headerBody'>
                    <Search hideButtons />
                    <div className='searchPage_options'>
                        <div className="searchPage_optionsLeft">
                            <div className="searchPage_option">
                                <SearchIcon />
                                <Link to='/all'>All</Link>
                            </div>
                            <div className="searchPage_option">
                                <DescriptionIcon />
                                <Link to='/news'>News</Link>
                            </div>
                            <div className="searchPage_option">
                                <ImageIcon />
                                <Link to='/images'>Images</Link>
                            </div>
                            <div className="searchPage_option">
                                <LocalOfferIcon />
                                <Link to='/shopping'>shopping</Link>
                            </div>
                            <div className="searchPage_option">
                                <RoomIcon />
                                <Link to='/maps'>maps</Link>
                            </div>
                            <div className="searchPage_option">
                                <MoreVertIcon />
                                <Link to='/more'>more</Link>
                            </div>
                        </div>

                        <div className='searchPage_optionsRight'>
                            <div className="searchPage_option">
                                <Link to='/settings'>Settings</Link>
                            </div>
                            <div className="searchPage_option">
                                <Link to='/tools'>Tools</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {term && (
                <div className='searchPage__results'>

                    <p className='searchPage__resultsCount'>About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for {term}</p>

                    {data?.items.map(item => (
                        <div className='searchPage__result'>

                            <a href={item.link} className='searchPage__resultLink'>

                                {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                                    <img
                                        className='searchPage__resultImage'
                                        src = {item.pagemap?.cse_image[0]?.src} alt=''
                                    />
                                )}
                                {item.displayLink} ▽
                            
                            </a>
                            <a className='searchPage__resultTitle' href={item.link}>
                                <h2>{item.title}</h2>
                            </a>
                            <p className='searchPage__resultSnippet'>{item.snippet}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchPage;