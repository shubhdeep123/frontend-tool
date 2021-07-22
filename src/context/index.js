import { store } from "../store";
import React, { useState } from "react";
export const ToolContext = React.createContext();

const ToolContextProvider = ({ children }) => {
  const [state, setState] = useState(store);

  const getJSONData = (data) => {
    setState({ ...data });
  };

  const triggerDragDrop = (dragIds, dropIds) => {
    const newState = state;
    if (dragIds.length === 1) {
      const getDragChapterIndex = newState.childrenAllIdsOrder.findIndex(
        (id) => id === dragIds[0]
      );

      const getDropChapterIndex = newState.childrenAllIdsOrder.findIndex(
        (id) => id === dropIds[0]
      );

      const swapId = newState.childrenAllIdsOrder.splice(
        getDragChapterIndex,
        1
      );

      newState.childrenAllIdsOrder.splice(getDropChapterIndex, 0, ...swapId);
    } else if (dragIds.length === 2) {
      const getDraggedHeading =
        newState.children[dragIds[0]].children[dragIds[1]];

      delete newState.children[dragIds[0]].children[dragIds[1]];
      const findIndexOfDragHeading = newState.children[
        dragIds[0]
      ].childrenAllIdsOrder.findIndex((id) => id === dragIds[1]);
      newState.children[dragIds[0]].childrenAllIdsOrder.splice(
        findIndexOfDragHeading,
        1
      );

      const getDropElementHeadingIndex = newState.children[
        dropIds[0]
      ].childrenAllIdsOrder.findIndex((id) => id === dropIds[1]);
      newState.children[dropIds[0]].childrenAllIdsOrder.splice(
        getDropElementHeadingIndex,
        0,
        dragIds[1]
      );
      newState.children[dropIds[0]].children[dragIds[1]] = {
        ...getDraggedHeading,
      };
    } else if (dragIds.length === 3) {
      const getDraggedSubChild =
        newState.children[dragIds[0]].children[dragIds[1]].children[dragIds[2]];

      delete newState.children[dragIds[0]].children[dragIds[1]].children[
        dragIds[2]
      ];

      const findIndexOfDragSubheading = newState.children[dragIds[0]].children[
        dragIds[1]
      ].childrenAllIdsOrder.findIndex((id) => id === dragIds[2]);

      newState.children[dragIds[0]].children[
        dragIds[1]
      ].childrenAllIdsOrder.splice(findIndexOfDragSubheading, 1);

      const getDropElementSubheadingIndex = newState.children[
        dropIds[0]
      ].children[dropIds[1]].childrenAllIdsOrder.findIndex(
        (id) => id === dropIds[2]
      );

      newState.children[dropIds[0]].children[
        dropIds[1]
      ].childrenAllIdsOrder.splice(
        getDropElementSubheadingIndex,
        0,
        dragIds[2]
      );

      newState.children[dropIds[0]].children[dropIds[1]].children[
        dragIds[2]
      ] = {
        name: getDraggedSubChild.name,
      };
    }

    setState({ ...state });
  };

  const HandleChangeStandard = (event, chapterId, headingId, subheadingId) => {
    const newState = state;
    const { value } = event.target;

    if (chapterId && headingId && subheadingId) {
      newState.children[chapterId].children[headingId].children[
        subheadingId
      ].name = value;
    } else if (chapterId && headingId) {
      newState.children[chapterId].children[headingId].name = value;
    } else if (chapterId) {
      newState.children[chapterId].name = value;
    }

    setState({ ...newState });
  };

  const trashStandard = (chapterId, headingId, subheadingId) => {
    const newState = state;

    if (chapterId && headingId && subheadingId) {
      newState.children[chapterId].children[
        headingId
      ].childrenAllIdsOrder = newState.children[chapterId].children[
        headingId
      ].childrenAllIdsOrder.filter((id) => id !== subheadingId);
      delete newState.children[chapterId].children[headingId].children[
        subheadingId
      ];
    } else if (chapterId && headingId) {
      newState.children[chapterId].childrenAllIdsOrder = newState.children[
        chapterId
      ].childrenAllIdsOrder.filter((id) => id !== headingId);
      delete newState.children[chapterId].children[headingId];
    } else if (chapterId) {
      newState.childrenAllIdsOrder = newState.childrenAllIdsOrder.filter(
        (id) => id !== chapterId
      );
      delete newState.children[chapterId];
    } 

    setState({ ...newState });
  };

  const addStandard = (currentStandard, newStandard) => {
    const newState = state;
    const newId = Math.random();
    if (currentStandard === "CHAPTER") {
      newState.childrenAllIdsOrder = [...newState.childrenAllIdsOrder, newId];
      newState.children[newId] = {
        name: newStandard,
        children: {},
        childrenAllIdsOrder: [],
      };
    } else if (currentStandard === "HEADING") {
      const getLastChapterId =
        newState.childrenAllIdsOrder[newState.childrenAllIdsOrder.length - 1];

      if (getLastChapterId) {
        newState.children[getLastChapterId].childrenAllIdsOrder = [
          ...newState.children[getLastChapterId].childrenAllIdsOrder,
          newId,
        ];
        newState.children[getLastChapterId].children[newId] = {
          name: newStandard,
          children: {},
          childrenAllIdsOrder: [],
        };

        setState({ ...newState });
      } else {
        alert("There Are no chapters. Please Add chapters.");
      }
    } else if (currentStandard === "SUBHEADING") {
      const getLastChapterId =
        newState.childrenAllIdsOrder[newState.childrenAllIdsOrder.length - 1];

      if (getLastChapterId) {
        const getLastHeadingId =
          newState.children[getLastChapterId].childrenAllIdsOrder[
            newState.children[getLastChapterId].childrenAllIdsOrder.length - 1
          ];

        if (getLastHeadingId) {
          const getLastHeadingChildren =
            newState.children[getLastChapterId].children[getLastHeadingId];

          getLastHeadingChildren.children[newId] = { name: newStandard };
          getLastHeadingChildren.childrenAllIdsOrder = [
            ...getLastHeadingChildren.childrenAllIdsOrder,
            newId,
          ];

          setState({ ...newState });
        } else {
          alert("The is no Heading in the Chapter.");
        }
      } else {
        alert("There is no Chapter.");
      }
    }
  };

  const handleIndent = (chapterId, headingId, subHeadingId) => {
    const newState = state;

    if (chapterId && headingId && subHeadingId) {
      alert("Maximum intend level reached.");
    } else if (chapterId && headingId) {
      const { children, childrenAllIdsOrder } = newState.children[chapterId];
      const { name } = children[headingId];

      const getPreviousHeadingOrder =
        childrenAllIdsOrder.findIndex((id) => id === headingId) - 1;

      if (getPreviousHeadingOrder === -1) {
        alert("Your Chapter is having no heading.");
      } else {
        const takeAllHeadingIds = children[
          headingId
        ].childrenAllIdsOrder.splice(
          0,
          children[headingId].childrenAllIdsOrder.length
        );

        const previousHeadId = childrenAllIdsOrder[getPreviousHeadingOrder];

        children[previousHeadId].children[headingId] = {
          name,
          children: {},
          childrenAllIdsOrder: [],
        };
        /*
         *   Merging the Children
         */

        children[previousHeadId].childrenAllIdsOrder = [
          ...children[previousHeadId].childrenAllIdsOrder,
          headingId,
          ...takeAllHeadingIds,
        ];

        for (const i of takeAllHeadingIds) {
          children[previousHeadId].children[i] = {
            name: children[headingId].children[i].name,
            children: {},
            childrenAllIdsOrder: [],
          };
        }
        delete children[headingId];

        const newchildrenAllIdsOrder = childrenAllIdsOrder.filter(
          (id) => id !== headingId
        );

        newState.children[
          chapterId
        ].childrenAllIdsOrder = newchildrenAllIdsOrder;

        setState({ ...state });
      }
    } else if (chapterId) {
      if (newState.childrenAllIdsOrder.length === 1) {
        alert("One Chapter cannot be Subhead.");
      } else {
        /**
         * Moving from chapter
         * to heading and making sub-heading
         * */
        const { name } = newState.children[chapterId];
        const { children, childrenAllIdsOrder } = newState;

        const getAllCurrentChapterId = children[chapterId].childrenAllIdsOrder;
        const getBeforeChapterIndex =
          childrenAllIdsOrder.findIndex((id) => id === chapterId) - 1;
        const getBeforeChapterId = childrenAllIdsOrder[getBeforeChapterIndex];

        children[getBeforeChapterId].children[chapterId] = {
          name,
          childrenAllIdsOrder: [],
          children: {},
        };

        children[getBeforeChapterId].childrenAllIdsOrder = [
          ...children[getBeforeChapterId].childrenAllIdsOrder,
          chapterId,
        ];

        for (const i of getAllCurrentChapterId) {
          children[getBeforeChapterId].childrenAllIdsOrder = [
            ...children[getBeforeChapterId].childrenAllIdsOrder,
            i,
          ];
          const childNamesOfHeading = children[chapterId].children[i].name;
          children[getBeforeChapterId].children[i] = {
            name: childNamesOfHeading,
            children: {},
            childrenAllIdsOrder: [],
          };
        }

        const newchildrenAllIdsOrder = childrenAllIdsOrder.filter(
          (id) => id !== chapterId
        );
        newState.childrenAllIdsOrder = newchildrenAllIdsOrder;
        delete newState.children[chapterId];

        setState({ ...newState });
      }
    }
  };
  const handleOutdent = (chapterId, headingId, subHeadingId) => {
    const newState = state;
    if (chapterId && headingId && subHeadingId) {
      const { children, childrenAllIdsOrder } = newState.children[chapterId];
      const { name } = newState.children[chapterId].children[
        headingId
      ].children[subHeadingId];

      const findSubheadingIndex = children[
        headingId
      ].childrenAllIdsOrder.findIndex((id) => id === subHeadingId);

      const extractRemainingSubHeadingIds = children[
        headingId
      ].childrenAllIdsOrder.splice(
        findSubheadingIndex + 1,
        children[headingId].childrenAllIdsOrder.length
      );

      children[subHeadingId] = {
        children: {},
        childrenAllIdsOrder: extractRemainingSubHeadingIds,
      };

      const subHeadingChildren = children[headingId].children;

      children[subHeadingId].name = name;
      for (const i of extractRemainingSubHeadingIds) {
        children[subHeadingId].children[i] = {
          name: subHeadingChildren[i].name,
        };
      }

      ///REMOVING ALL ID OF SUBHEADING
      for (const i of children[subHeadingId].childrenAllIdsOrder) {
        delete children[headingId].children[i];
      }
      delete children[headingId].children[subHeadingId];
      const findSubheadingIndexDelete = children[
        headingId
      ].childrenAllIdsOrder.findIndex((id) => id === subHeadingId);

      children[headingId].childrenAllIdsOrder.splice(
        findSubheadingIndexDelete,
        1
      );

      const getHeadingIndex = childrenAllIdsOrder.findIndex(
        (id) => id === headingId
      );
      childrenAllIdsOrder.splice(getHeadingIndex + 1, 0, subHeadingId);

      setState({ ...newState });
    } else if (chapterId && headingId) {
      /* from heading
       * to chapter
       */
      const { children, childrenAllIdsOrder } = newState;
      const { name } = children[chapterId].children[headingId];
      const findHeadingIndex = children[
        chapterId
      ].childrenAllIdsOrder.findIndex((id) => id === headingId);

      if (
        children[chapterId].children[headingId].childrenAllIdsOrder.length !== 0
      ) {
        alert("You have Sub-heading to settle.");
      } else if (findHeadingIndex + 1) {
        const slicingChildren = children[chapterId].childrenAllIdsOrder.slice(
          findHeadingIndex,
          children[chapterId].childrenAllIdsOrder.length
        );

        slicingChildren.shift();

        children[headingId] = {
          name,
          children: {},
          childrenAllIdsOrder: slicingChildren,
        };

        for (const i of slicingChildren) {
          children[headingId].children[i] = {
            name: children[chapterId].children[i].name,
            children: {},
            childrenAllIdsOrder: [],
          };
        }

        children[chapterId].childrenAllIdsOrder = children[
          chapterId
        ].childrenAllIdsOrder.slice(0, findHeadingIndex);

        for (const i of slicingChildren) {
          delete children[chapterId].children[i];
        }
        delete children[chapterId].children[headingId];

        const getChapterIndex = childrenAllIdsOrder.findIndex(
          (id) => id === chapterId
        );
        newState.childrenAllIdsOrder.splice(getChapterIndex + 1, 0, headingId);

        setState({ ...newState });
      } else {
        alert("No heading but sub headings are there.");
      }
    } else if (chapterId) {
      alert("Maximum outdent level reached.");
    }
  };

  return (
    <ToolContext.Provider
      value={{
        state: state,
        handleIndent,
        handleOutdent,
        HandleChangeStandard,
        trashStandard,
        addStandard,
        getJSONData,
        triggerDragDrop,
      }}
    >
      <div className="App">{children}</div>
    </ToolContext.Provider>
  );
};

export default ToolContextProvider;
