import { GradientText } from '@/components/ui/GradientText'
import { GlassCard } from '@/components/ui/GlassCard'
import { HOME_STATS } from '@/lib/constants'
import { Building2, Clock, Layers, Star, type LucideIcon } from 'lucide-react'

const STAT_ICONS: LucideIcon[] = [Building2, Star, Clock, Layers]

export function StatsSection() {
  return (
    <section className="relative section-padding">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-axm-navy/60 via-axm-deep/40 to-transparent"
        aria-hidden
      />

      <div className="mx-auto max-w-container px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {HOME_STATS.map((stat, index) => {
            const Icon = STAT_ICONS[index]

            return (
              <GlassCard
                key={stat.label}
                className="holo-border text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-blue"
              >
                <Icon
                  size={20}
                  className="mx-auto mb-3 text-axm-cyan"
                  aria-hidden
                />
                <GradientText
                  as="p"
                  className="bg-gradient-to-br from-axm-blue to-axm-cyan font-display text-display-lg font-bold"
                >
                  {stat.value}
                </GradientText>
                <p className="mt-2 text-body-md text-axm-gray">{stat.label}</p>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
