import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id="alert-top-page">
      <div id={id}>
        <Slider class="gap-6 scrollbar-none">
          {alerts.map((alert) => (
            <Text
              className="flex bg-footer text-sm md:text-md md:bg-white justify-center items-center w-screen h-[38px] text-gray-600 uppercase"
              variant="caption"
              tone="default"
            >
              {alert}
            </Text>
          ))}
        </Slider>

        <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
      </div>
    </div>
  );
}

export default Alert;
