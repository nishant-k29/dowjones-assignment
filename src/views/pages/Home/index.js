import React from 'react';
import { retrievePostList } from 'services/features/posts/actions';
import { useDispatch, useSelector } from 'react-redux';
import List from '../../components/List/index';
import Loader from '../../components/Loader/index';
import { itemsPerPage } from 'views/utils/constants';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import homeStyles from './index.module.css';

const Home = () => {
  const { loading, updatedPostList } = useSelector((state) => state.posts);

  const descendingOrderPostList =
    loading &&
    [...updatedPostList].sort(
      (prevItem, nextItem) => nextItem.id - prevItem.id,
    );

  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [pageCount, setPageCount] = React.useState(1);

  React.useEffect(() => {
    dispatch(retrievePostList());
  }, [dispatch]);

  const totalItems = descendingOrderPostList;

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = React.useState([]);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working  with.
  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (loading) {
      setCurrentItems(totalItems.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(totalItems.length / itemsPerPage));
    }
  }, [itemOffset, loading, updatedPostList]);

  const handlePageClick = (event) => {
    if (loading) {
      const newOffset =
        (event.selected * itemsPerPage) % descendingOrderPostList.length;
      setItemOffset(newOffset);
      setSearchParams(`page=${event.selected}`);
    }
  };

  return (
    <div className={homeStyles.section}>
      <div className={homeStyles.container}>
        {loading && <List list={currentItems} />}
        {!loading && (
          <Loader height={'2rem'} width={'2rem'} color={'rgb(131, 109, 60)'} />
        )}
        <div className={homeStyles.paginate}>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
