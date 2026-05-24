import { DeckGL } from "@deck.gl/react";
import { OrthographicView } from "@deck.gl/core";
import { Tooltip } from "./Tooltip/Tooltip";
import { AddingPoint } from "./AddingPoint/AddingPoint";
import { INITIAL_VIEW_STATE } from "./constants";
import { useMap } from "./useMap";

export const Map = () => {
  const {
    layers,
    clickedInfo,
    addFormOpened,
    setAddFormOpened,
    handleTooltipClose,
  } = useMap();

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        views={new OrthographicView({ id: "ortho-view" })}
      />

      {clickedInfo && (
        <Tooltip onClick={handleTooltipClose} clickedInfo={clickedInfo} />
      )}
      <button
        onClick={() => setAddFormOpened((prev) => !prev)}
        style={{ position: "fixed" }}
      >
        Добавить точку
      </button>
      {addFormOpened && <AddingPoint />}
    </div>
  );
};
