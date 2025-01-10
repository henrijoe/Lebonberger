import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InformationState } from "../schemas/informationSchemas";

const initialState: InformationState = {
  likes: 0,
  comments: [],
  views: 0,
  isLiked: false,
};

export const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<boolean>) => {
      state.isLiked = action.payload;
      if (action.payload) {
        state.likes += 1;
      } else {
        state.likes -= 1;
      }
    },

    incrementViews: (state) => {
      state.views += 1;
    },

    addComment: (state, action: PayloadAction<string>) => {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      state.comments.push({ text: action.payload, timestamp, responses: [] });
    },

    // addResponse: (state, action: PayloadAction<{ indexPath: string; response: string }>) => {
    //   const { indexPath, response } = action.payload;

    //   const timestamp = new Date().toLocaleTimeString([], {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //   });

    //   const newResponse = { text: response, timestamp, responses: [] };

    //   // Fonction pour ajouter la réponse au bon niveau
    //   const addNestedResponse = (commentsArray: any[], path: string[]) => {
    //     const currentIndex = parseInt(path[0], 10);
    //     if (path.length === 1) {
    //       commentsArray[currentIndex].responses.push(newResponse);
    //     } else {
    //       addNestedResponse(commentsArray[currentIndex].responses, path.slice(1));
    //     }
    //   };

    //   const pathArray = indexPath.split("-");
    //   addNestedResponse(state.comments, pathArray);
    // },

    addResponse: (state, action: PayloadAction<{ indexPath: string; response: string }>) => {
      const { indexPath, response } = action.payload;
    
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    
      const newResponse = { text: response, timestamp, responses: [] };
    
      // Fonction pour ajouter la réponse au bon niveau
      const addNestedResponse = (commentsArray: any[], path: string[]) => {
        const currentIndex = parseInt(path[0], 10);
        if (path.length === 1) {
          // Éviter la duplication en vérifiant si la réponse existe déjà
          if (!commentsArray[currentIndex].responses.some((res:any) => res.text === response)) {
            commentsArray[currentIndex].responses.push(newResponse);
          }
        } else {
          addNestedResponse(commentsArray[currentIndex].responses, path.slice(1));
        }
      };
    
      const pathArray = indexPath.split("-");
      addNestedResponse(state.comments, pathArray);
    },
  },
});

export const { toggleLike, addComment, addResponse, incrementViews } = informationSlice.actions;
export default informationSlice.reducer;
