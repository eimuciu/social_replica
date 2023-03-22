export const reducer = (state, action) => {
  switch (action.type) {
    case "searchedPhotos":
      return {
        ...state,
        photos: action.payload.photos.map((item, index) => {
          if (index === 0) {
            return {
              ...item,
              isActive: true
            };
          }
          return {
            ...item,
            isActive: false
          };
        }),
        pageIndex: 1,
        searchTerm: "",
        searchTermAfterSubmit: action.payload.searchedTerm
      };
    case "changeSearchTerm":
      return {
        ...state,
        searchTerm: action.payload
      };
    case "photos":
      return {
        ...state,
        photos: action.payload.map((item, index) => {
          if (index === 0) {
            return {
              ...item,
              isActive: true
            };
          }
          return {
            ...item,
            isActive: false
          };
        })
      };
    case "nextPhoto": {
      const activePhoto = state.photos.filter(x => x.isActive)[0];
      const activePhotoIndex = state.photos.indexOf(activePhoto);
      let nextActivePhotoIndex = activePhotoIndex + 1;

      if (nextActivePhotoIndex >= state.photos.length) {
        return {
          ...state,
          pageIndex: state.pageIndex + 1
        };
      }

      return {
        ...state,
        photos: state.photos.map((item, index) => {
          if (index === nextActivePhotoIndex) {
            return {
              ...item,
              isActive: true
            };
          }
          return {
            ...item,
            isActive: false
          };
        })
      };
    }
    case "previousPhoto": {
      const activePhoto = state.photos.filter(x => x.isActive)[0];
      const activePhotoIndex = state.photos.indexOf(activePhoto);
      let previousActivePhotoIndex = activePhotoIndex - 1;

      if (previousActivePhotoIndex < 0) {
        if (state.pageIndex <= 0) {
          return state;
        }
        return {
          ...state,
          pageIndex: state.pageIndex - 1
        };
      }

      return {
        ...state,
        photos: state.photos.map((item, index) => {
          if (index === previousActivePhotoIndex) {
            return {
              ...item,
              isActive: true
            };
          }
          return {
            ...item,
            isActive: false
          };
        })
      };
    }
    case "showImage": {
      const activePhotoIndex = state.photos.indexOf(action.payload);
      const arr = state.photos.map((item, index) => {
        if (index === activePhotoIndex) {
          return {
            ...item,
            isActive: true
          };
        } else {
          return {
            ...item,
            isActive: false
          };
        }
      });
      return {
        ...state,
        photos: arr
      };
    }
    case "nextPage":
      return { ...state, pageIndex: state.pageIndex + 1 };
    case "prevPage":
      if (state.pageIndex <= 1) {
        return state;
      }
      return { ...state, pageIndex: state.pageIndex - 1 };

    case "setFullSizeImage":
      return {
        ...state,
        isFullSizeImage: action.payload
      };
    default: {
      return state;
    }
  }
};
