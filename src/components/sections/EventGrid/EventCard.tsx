import { CalendarIcon, MapPinIcon, TicketIcon } from '@heroicons/react/24/outline'
import { useAppStore } from '@/store/appStore'
import { formatEventDate, formatPrice, formatTicketsCount } from '@/utils/formatters'
import Card from '@/components/ui/Card'
import type { Event } from '@/types/event'

interface EventCardProps {
  event: Event
}

const EventCard = ({ event }: EventCardProps) => {
  const language = useAppStore(state => state.language)

  return (
    <Card variant="outlined" hoverEffect className="overflow-hidden">
      <div className="relative h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <TicketIcon className="w-16 h-16" />
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 bg-white/90 dark:bg-black/90 text-black dark:text-white text-t4 font-body rounded-full">
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-h4 font-heading mb-3 line-clamp-2">{event.title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-t3 text-gray-600 dark:text-gray-400">
            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
            <span>{formatEventDate(event.date, language)}</span>
          </div>

          <div className="flex items-center gap-2 text-t3 text-gray-600 dark:text-gray-400">
            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">
              {event.location.city}, {event.location.venue}
            </span>
          </div>

          <div className="flex items-center gap-2 text-t3 text-gray-600 dark:text-gray-400">
            <TicketIcon className="w-4 h-4 flex-shrink-0" />
            <span>{formatTicketsCount(event.ticketsAvailable, language)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
          <span className="text-t2 font-heading text-brand-orange">
            {formatPrice(event.price, language)}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default EventCard
