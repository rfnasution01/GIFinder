import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Layout from '../layouts';
import { getGifBySearch, getGifByTrending } from '../configs/axios/fetchGif';
import Card from '../component/Card';
import './styles.css';
import Pagination from '../component/Pagination';
import useDebounce from '../utils/useDebounce';

interface RouteProps {
  setRoute: Dispatch<SetStateAction<number>>;
  route: number;
}

const SearchPage: React.FC<RouteProps> = ({ setRoute, route }) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY || '';

  // --- Pagination Elemen --
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // --- Debounce Search ---
  const debouncedSearchQuery = useDebounce(searchQuery, 10000);

  // --- Handle Search ---
  useEffect(() => {
    // --- Function Search ---
    const searchGifs = async () => {
      setIsLoading(true);

      try {
        const params = {
          api_key: apiKey,
          limit: 9,
          q: searchQuery,
          offset: 0,
        };
        const response = await getGifBySearch(params);

        if (response.data.meta.status === 200) {
          setData(response.data.data);
          setPage(response.data.pagination.offset);
          setError('');
        } else {
          setError('Terjadi kesalahan saat mengambil data.');
          setData([]);
        }
      } catch (error) {
        setError('Terjadi kesalahan saat mengambil data.');
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedSearchQuery) {
      searchGifs();
    } else {
      const getTrendingGifs = async () => {
        setIsLoading(true);

        try {
          const params = {
            api_key: apiKey,
            limit: 9,
            offset: page,
          };
          const response = await getGifByTrending(params);

          if (response.data.meta.status === 200) {
            setData(response.data.data);
            setPage(response.data.pagination.offset);
            setError('');
          } else {
            setError('Terjadi kesalahan saat mengambil data.');
            setData([]);
          }
        } catch (error) {
          setError('Terjadi kesalahan saat mengambil data.');
          setData([]);
        } finally {
          setIsLoading(false);
        }
      };

      getTrendingGifs();
    }
  }, [apiKey, page, debouncedSearchQuery, searchQuery]);

  return (
    <div>
      {/* --- Content --- */}
      <Layout setRoute={setRoute} route={route} title='Search your giphy'>
        {/* --- Search Form --- */}
        <form 
          style={{
            padding: '20px 0',
          }}
        >
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Enter search query...'
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '2px solid #ccc',
              borderRadius: '5px',
              width: '300px',
              outline: 'none',
              transition: 'border-color 0.2s ease-in-out'
            }}
          />
        </form>

        {isLoading ? (
          <div
            style={{
              marginTop: '57px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '70vh',
            }}
          >
            <div className='loadingDots'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '20px 10px 20px 10px' }}>Error: {error}</div>
        ) : (
          <>
            {data.length > 0 ? (
              <div>
                {/* --- Main Content --- */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    width: '100%',
                  }}
                >
                  {data.map((item, idx) => (
                    <Card key={idx} image={item?.images?.downsized_large?.url} />
                  ))}
                </div>
                {/* --- Pagination --- */}
                <Pagination page={page} onPageClick={handlePageClick} />
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>No data available.{page}</div>
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export default SearchPage;
