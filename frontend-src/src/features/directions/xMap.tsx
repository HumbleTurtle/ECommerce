import React, { FunctionComponent, useEffect, useState } from 'react';
import { Marker, Map, Draggable } from 'pigeon-maps';


interface PageProps {
  onAnchorChange : Function
}

export const XMap : FunctionComponent<PageProps> = ({onAnchorChange}) => {
  const [anchor, setAnchor] = useState<[number, number]>([-25.2637, -57.5759]);

  useEffect(()=>{
    onAnchorChange(anchor);
  },[anchor])

  return (
    <Map height={500} defaultCenter={[-25.2637, -57.5759]} defaultZoom={11}>
      <Draggable offset={[30, 56]} anchor={anchor} onDragEnd={setAnchor}>
        <Marker 
          width={60} height={60}
          anchor={[0,0]} 
        />
      </Draggable>
    </Map>
  )
}

XMap.defaultProps = {
  onAnchorChange: () => {}
}