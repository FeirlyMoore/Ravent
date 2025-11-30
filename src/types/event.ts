export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: {
    city: string
    venue: string
    address: string
  }
  category: string
  price: {
    min: number
    max: number
    currency: 'RUB' | 'USD' | 'EUR'
  }
  image?: string
  organizer: {
    id: string
    name: string
  }
  ticketsAvailable: number
  tags: string[]
}
