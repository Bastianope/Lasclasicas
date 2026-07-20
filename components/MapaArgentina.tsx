'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function MapaArgentina() {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    el.innerHTML = ''

    Promise.all([
      import('https://esm.sh/d3@7' as any),
      import('https://esm.sh/topojson-client@3' as any)
    ]).then(([d3, topojson]) => {
      const W = 680, H = 720
      const svg = d3.select(el).append('svg')
        .attr('viewBox', `0 0 ${W} ${H}`)
        .attr('width', '100%')
        .style('background', '#0F1117')

      const defs = svg.append('defs')
      ;[
        { id: 'g-lg', color: '#D4A847' },
        { id: 'g-md', color: '#C49B35' },
        { id: 'g-sm', color: '#B08820' },
      ].forEach(g => {
        const rg = defs.append('radialGradient').attr('id', g.id)
        rg.append('stop').attr('offset', '0%').attr('stop-color', g.color).attr('stop-opacity', 0.9)
        rg.append('stop').attr('offset', '100%').attr('stop-color', g.color).attr('stop-opacity', 0)
      })

      d3.range(120).map(() => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 0.9 + 0.2, o: Math.random() * 0.3 + 0.1
      })).forEach((s: any) => {
        svg.append('circle').attr('cx', s.x).attr('cy', s.y)
          .attr('r', s.r).attr('fill', '#D4A847').attr('opacity', s.o)
      })

      const projection = d3.geoMercator()
        .center([-65, -38]).scale(650).translate([W / 2, H / 2])
      const path = d3.geoPath().projection(projection)

      d3.json('https://cdn.jsdelivr.net/npm/datamaps@0.5.10/src/js/data/arg.topo.json')
        .then((topo: any) => {
          const features = topojson.feature(topo, topo.objects.arg).features

          svg.selectAll('path.prov').data(features).join('path')
            .attr('class', 'prov').attr('d', path)
            .attr('fill', '#141820')
            .attr('stroke', 'rgba(212,168,71,0.25)')
            .attr('stroke-width', 0.6)
            .style('cursor', 'pointer')
            .on('mouseover', function(this: any) {
              d3.select(this).attr('fill', '#1e2535')
            })
            .on('mouseout', function(this: any) {
              d3.select(this).attr('fill', '#141820')
            })
            .on('click', (_: any, d: any) => {
              const name = d.properties?.name
              if (name) router.push(`/anuncios?provincia=${encodeURIComponent(name)}`)
            })

          const cities = [
            { name: 'Buenos Aires', lat: -34.6, lon: -58.4, pop: 3, label: 'right' },
            { name: 'Córdoba',      lat: -31.4, lon: -64.2, pop: 2, label: 'right' },
            { name: 'Rosario',      lat: -32.9, lon: -60.7, pop: 2, label: 'right' },
            { name: 'Mendoza',      lat: -32.9, lon: -68.8, pop: 1, label: 'left'  },
            { name: 'Santa Fe',     lat: -31.6, lon: -60.7, pop: 1, label: 'right' },
            { name: 'Tucumán',      lat: -26.8, lon: -65.2, pop: 1, label: 'right' },
            { name: 'Mar del Plata',lat: -38.0, lon: -57.6, pop: 1, label: 'right' },
            { name: 'Neuquén',      lat: -38.9, lon: -68.1, pop: 1, label: 'left'  },
            { name: 'Bariloche',    lat: -41.1, lon: -71.3, pop: 1, label: 'left'  },
            { name: 'Salta',        lat: -24.8, lon: -65.4, pop: 1, label: 'right' },
          ]

          cities.forEach((city: any) => {
            const [cx, cy] = projection([city.lon, city.lat])
            const isMajor = city.pop >= 2
            const glowId = city.pop === 3 ? 'g-lg' : city.pop === 2 ? 'g-md' : 'g-sm'
            const glowSize = city.pop === 3 ? 52 : city.pop === 2 ? 28 : 15
            const g = svg.append('g').style('cursor', 'pointer')
              .on('click', () => router.push(`/anuncios?provincia=${encodeURIComponent(city.name)}`))

            g.append('ellipse')
              .attr('cx', cx).attr('cy', cy)
              .attr('rx', glowSize).attr('ry', glowSize * 0.65)
              .attr('fill', `url(#${glowId})`)

            g.append('circle')
              .attr('cx', cx).attr('cy', cy)
              .attr('r', city.pop === 3 ? 5 : city.pop === 2 ? 3 : 2)
              .attr('fill', '#D4A847').attr('opacity', 0.95)

            if (city.pop === 3) {
              g.append('circle')
                .attr('cx', cx).attr('cy', cy).attr('r', 9)
                .attr('fill', 'none').attr('stroke', '#D4A847')
                .attr('stroke-width', 0.8).attr('opacity', 0.4)
            }

            g.append('text')
              .attr('x', cx + (city.label === 'left' ? -10 : 10))
              .attr('y', cy + 1)
              .attr('text-anchor', city.label === 'left' ? 'end' : 'start')
              .attr('font-size', isMajor ? '12px' : '10px')
              .attr('font-weight', isMajor ? '500' : '400')
              .attr('fill', isMajor ? '#D4A847' : 'rgba(212,168,71,0.55)')
              .attr('font-family', 'sans-serif')
              .text(city.name)
          })
        })
    })
  }, [])

  return <div ref={ref} style={{ background: '#0F1117', minHeight: '500px' }} />
}