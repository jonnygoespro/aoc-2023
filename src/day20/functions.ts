interface Pulse {
  type: 'high' | 'low'
  module: Module
  from: string
}

interface BaseModule {
  name: string
  destinations: string[]
}

type FlipFlopModule = BaseModule & {
  type: 'ff'
  state: boolean
}

type ConjunctionModule = BaseModule & {
  type: 'c'
  states: Map<string, string>
}

type BroadcastModule = BaseModule & {
  type: 'b'
}

type Module = FlipFlopModule | ConjunctionModule | BroadcastModule

type Modules = Map<string, Module>

export const parseInput = (input: string): Modules => {
  const modules = new Map()

  input.split('\n').forEach(row => {
    const [nameString, destinations] = row.split(' -> ')

    if (nameString[0] === '%') {
      const name = nameString.split('').slice(1).join('')
      const newModule: FlipFlopModule = {
        name,
        destinations: destinations.split(', '),
        type: 'ff',
        state: false
      }
      modules.set(name, newModule as Module)
    } else if (nameString[0] === '&') {
      const name = nameString.split('').slice(1).join('')
      const newModule: ConjunctionModule = {
        name,
        destinations: destinations.split(', '),
        type: 'c',
        states: new Map()
      }
      modules.set(name, newModule as Module)
    } else {
      const newModule: BroadcastModule = {
        name: nameString,
        destinations: destinations.split(', '),
        type: 'b'
      }
      modules.set(nameString, newModule as Module)
    }
  })

  modules.forEach((module) => {
    if (module.type === 'c') {
      // const name = value.name
      modules.forEach((module2: Module) => {
        if (module2.destinations.includes(module.name)) {
          (module as ConjunctionModule).states.set(module2.name, 'low')
        }
      })
    }
  })

  return modules
}

export const executeButtonPress = (modules: Map<string, Module>): [number, number, Map<string, Module>] => {
  const startingModule = modules.get('broadcaster')!
  const queue: Pulse[] = [{
    module: startingModule,
    type: 'low',
    from: 'button'
  }]

  let highPulses = 0
  let lowPulses = 0

  while (queue.length > 0) {
    const pulse = queue.shift()!
    if (pulse.type === 'high') {
      highPulses++
    } else {
      lowPulses++
    }

    if (pulse.module !== undefined) {
      executePulse(pulse, queue, modules)
    }
  }

  return [highPulses, lowPulses, modules]
}

export const executeButtonPressLookingForElement = (modules: Map<string, Module>, name: string, type: 'high' | 'low'): [boolean, Map<string, Module>] => {
  const startingModule = modules.get('broadcaster')!
  const queue: Pulse[] = [{
    module: startingModule,
    type: 'low',
    from: 'button'
  }]

  while (queue.length > 0) {
    const pulse = queue.shift()!
    if (pulse.from === name && pulse.type === type) {
      return [true, modules]
    }

    if (pulse.module !== undefined) {
      executePulse(pulse, queue, modules)
    } else {
      if (pulse.type === 'low') {
        return [true, modules]
      }
    }
  }

  return [false, modules]
}

const executePulse = (pulse: Pulse, queue: Pulse[], modules: Map<string, Module>): void => {
  if (pulse.module.type === 'b') {
    // broadcaster
    pulse.module.destinations.forEach(destination => {
      queue.push({
        module: modules.get(destination)!,
        type: pulse.type,
        from: pulse.module.name
      })
    })
  } else if (pulse.module.type === 'ff') {
    // flip flop module
    if (pulse.type === 'low') {
      const ffModule = modules.get(pulse.module.name) as FlipFlopModule
      ffModule.state = !ffModule.state
      pulse.module.destinations.forEach(destination => {
        queue.push({
          module: modules.get(destination)!,
          type: (ffModule.state) ? 'high' : 'low',
          from: pulse.module.name
        })
      })
    }
  } else if (pulse.module.type === 'c') {
    // conjuction module
    const cModule = modules.get(pulse.module.name) as ConjunctionModule
    cModule.states.set(pulse.from, pulse.type)

    let isNotAllHighPulse = false
    cModule.states.forEach((value) => {
      isNotAllHighPulse = isNotAllHighPulse || (value !== 'high')
    })

    cModule.destinations.forEach(destination => {
      queue.push({
        module: modules.get(destination)!,
        type: isNotAllHighPulse ? 'high' : 'low',
        from: cModule.name
      })
    })
  }
}
