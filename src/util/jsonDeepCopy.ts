export let jsonDeepCopy = <T>(data: T): T => JSON.parse(JSON.stringify(data))
