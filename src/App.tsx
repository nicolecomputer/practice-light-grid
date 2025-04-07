import React from 'react'
import './App.css'

function c(classNames: string[]): string {
  return classNames.join(" ")
}

type LightButtonProps = {
  isOn: boolean
  onClick: () => void
}

function LightButton({ isOn, onClick }: LightButtonProps) {
  if (isOn) {
    return (
      <div className={c(['light-button', 'light-on'])}>
      </div>
    )
  }

  return <button className={c(['light-button', 'light-off'])} onClick={onClick}></button>
}

type LightGridProps = {
  numberOfLights: number;
}

type ComponentMode = "lighting" | "extinguishing";
function LightGrid({ numberOfLights }: LightGridProps) {
  const [lightsOn, setLightsOn] = React.useState<number[]>([])
  const [mode, setMode] = React.useState<ComponentMode>("lighting");

  React.useEffect(() => {
    let timer: number;

    if (mode === "extinguishing") {
      timer = setTimeout(() => {
        if (lightsOn.length === 0) {
          setMode("lighting")
        } else {
          setLightsOn(lightsOn.slice(0, -1))
        }
      }, 500)
    }

    return () => clearTimeout(timer)
  }, [mode, lightsOn])

  return (
    <div className={c(['light-grid', `light-grid-${mode}`])}>
      {new Array(numberOfLights).fill(0).map((_, index) => {
        return (
          <LightButton
            key={"light-" + index}
            isOn={lightsOn.includes(index)}
            onClick={() => {
              if (mode === "lighting") {
                const nextLights = [...lightsOn, index]
                setLightsOn(nextLights)
                if (nextLights.length == numberOfLights) {
                  setMode("extinguishing")
                }
              }
            }} />
        );
      })}
    </div>
  );
}

function App() {
  return (
    <>
      <LightGrid numberOfLights={9} />
    </>
  )
}

export default App
