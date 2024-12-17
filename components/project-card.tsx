import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string | null
    createdAt: Date
    user: {
      name: string | null
      avatarUrl: string | null
    }
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.id}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          {project.description && (
            <CardDescription>{project.description}</CardDescription>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <span>by {project.user.name || 'Anonymous'}</span>
            <span>•</span>
            <span>{formatDistanceToNow(project.createdAt)} ago</span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}