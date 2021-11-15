import { React, Immutable, DataSourceManager } from "jimu-core";
import {JimuMapViewSelector, SettingSection, SettingRow} from 'jimu-ui/advanced/setting-components';
import { TextInput } from 'jimu-ui';
import {ArcGISDataSourceTypes} from 'jimu-arcgis';
import { AllWidgetSettingProps } from "jimu-for-builder";
import {IMConfig} from '../config';

export default function Setting (props: AllWidgetSettingProps<IMConfig>) {
    const supportedTypes = Immutable([ArcGISDataSourceTypes.WebMap]);
    const dsManager = DataSourceManager.getInstance();
    const onMapSelected = (useMapWidgetIds: string[]) => {
        props.onSettingChange({
            id: props.id,
            useMapWidgetIds: useMapWidgetIds
        });
    }
    const handlePrintServiceUrlChange = (evt: React.FormEvent<HTMLInputElement>) => {
        props.onSettingChange({
            id: props.id,
            config: props.config.set('printUrl', evt.currentTarget.value)
        });
    }
    return (
        <div className="p-2">
            <SettingSection className="map-selector-section" title={"Source"}>
                <SettingRow>
                    <JimuMapViewSelector onSelect={onMapSelected} useMapWidgetIds={props.useMapWidgetIds}/>
                </SettingRow>
            </SettingSection>
            <SettingSection title={"Service URL"}>
            <SettingRow>
                <TextInput style={{width: '100%'}} inputMode="url" placeholder="Enter print service url..." value={props.config.printUrl} onChange={handlePrintServiceUrlChange}/>
                </SettingRow>
            </SettingSection>      
        </div>
    );
}