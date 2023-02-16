import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './searchBar.css'

const SearchBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(9999);

    const history = useHistory()

    const handleCancel = () => {
        setMaxPrice(9999)
        setMinPrice(1)
        setShowMenu(false)
    };

    const handleSubmit = () => {
        setShowMenu(false)
        history.push('/search')
    }

    return (
        <div>
            <div className='search-bar-wrapper'>
                <form onSubmit={handleSubmit}>
                    <div id='search-bar' onClick={() => setShowMenu(true)}>
                        <div className='search-div'>Anywhere</div>
                        <div className='search-div'>Any week</div>
                        <div>Any price</div>
                        <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </div>

                    <div >
                        {showMenu && (
                            <div className='searchResults' style={{width:'300px'}}>
                                <div className='searchResults-title'>
                                    <h3>Start search</h3>
                                    <button onClick={handleCancel} id=''><i class="fa-solid fa-xmark"></i></button>
                                </div>
                                    <div>Price:
                                        <div>Select a range between 1 - 9999.</div>
                                        <label htmlFor='minPrice'>Minmum: &nbsp;
                                            <input
                                                type='number'
                                                value={minPrice}
                                                min='1'
                                                max='9999'
                                                placeholder='0'
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                required
                                            />
                                        </label>
                                        <span>&nbsp; - &nbsp;</span>
                                        <label htmlFor='minPrice'>Maximum: &nbsp;
                                            <input
                                                type='number'
                                                value={maxPrice}
                                                min='1'
                                                max='9999'
                                                placeholder='9999'
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                required
                                            />
                                        </label>
                                    </div>
                                    <button className='' type="submit" >Search</button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchBar;
