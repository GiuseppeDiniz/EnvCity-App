import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import {baseUrl, HEADERS} from '../config/index.json';

const useCatalog = () => {
  const [data, setData] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response: AxiosResponse<Catalog> = await axios.get(
          `${baseUrl}`,
          {
            headers: HEADERS
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao obter o catálogo.');
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  return { data, loading, error };
};

export default useCatalog;
