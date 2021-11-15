import { React, AllWidgetProps } from "jimu-core";
import { JimuMapView, JimuMapViewComponent } from 'jimu-arcgis';
import { useEffect, useRef } from "react";
import { IMConfig } from '../config';
import MapView from 'esri/views/MapView';
import PrintWidget from 'esri/widgets/Print';

export default function Widget(props: AllWidgetProps<IMConfig>) {
    const printWidgetContainer = useRef<HTMLDivElement>();
    const printWidget = useRef<PrintWidget>();
    const mapView = useRef<__esri.MapView>();
    const createPrintWidget = () => {
        console.log("creating print widget")
        if (printWidget.current) {
            printWidget.current.destroy();
            printWidget.current = null;
        }
        if (mapView.current && !printWidget.current && printWidgetContainer.current) {
            printWidget.current = new PrintWidget({
                view: mapView.current,
                printServiceUrl: props.config.printUrl,
                container: printWidgetContainer.current
            });
        }
    }
    const isMapView = (view: __esri.MapView | __esri.SceneView): view is __esri.MapView => {
        return view instanceof MapView
    }
    const mapConfigured = () => props.useMapWidgetIds && props.useMapWidgetIds.length === 1;
    const printConfigured = () => props.config.printUrl && props.config.printUrl.length > 0;
    useEffect(() => createPrintWidget(), [props.useMapWidgetIds, props.config.printUrl]);
    // useEffect(() => {
    //     return () => {
    //         if (printWidget.current) {
    //             printWidget.current.destroy();
    //             printWidget.current = null;
    //         }
    //     };
    // });
    const onActiveViewChange = (jimuMapView: JimuMapView) => {
        if (jimuMapView && isMapView(jimuMapView.view)) {
            mapView.current = jimuMapView.view;
            createPrintWidget();
        }
    }
    return (
        <>
            <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds?.[0]} onActiveViewChange={onActiveViewChange} />
            {mapConfigured() && printConfigured() && <div className="jimu-widget" ref={printWidgetContainer}></div>}
            {!mapConfigured() && <p>select a map (note 3D scenes are not currently supported by print services).</p>}
            {!printConfigured() && <p>provide print service url</p>}
        </>
    );
}