import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Layout from '../layouts';
import { getGifBySearch } from '../configs/axios/fetchGif';
import Card from '../component/Card';
import './styles.css';
import Pagination from '../component/Pagination';

interface RouteProps {
  setRoute: Dispatch<SetStateAction<number>>;
  route: number;
}

const IronmanPage: React.FC<RouteProps> = ({ setRoute, route }) => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY || '';

  // --- Pagination Elemen --
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  // --- Fetch API ---
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const params = {
        api_key: apiKey,
        limit: 9,
        q: 'ironman',
        offset: page,
      };
      try {
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

    getData();
  }, [apiKey, page]);

  return (
    <div>
      {/* --- Content --- */}
      <Layout setRoute={setRoute} route={route} title='Iron man giphy'>
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
              <div style={{ textAlign: 'center', padding: '20px' }}>No data available.</div>
            )}
          </>
        )}
      </Layout>
    </div>
  );
};

export default IronmanPage;
