"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RefreshCw, Play, Loader2, ListPlus } from "lucide-react"
import { toast } from "sonner"

interface QueueItem {
    id: string
    keyword: string
    status: 'pending' | 'processing' | 'completed' | 'failed'
    createdAt: string
    logs?: string
}

interface QueueStats {
    status: string
    count: number
}

export default function QueuePage() {
    const [topics, setTopics] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [items, setItems] = useState<QueueItem[]>([])
    const [stats, setStats] = useState<QueueStats[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchQueue = async () => {
        try {
            const res = await fetch('/api/admin/queue')
            const data = await res.json()
            if (data.recentItems) setItems(data.recentItems)
            if (data.stats) setStats(data.stats)
        } catch (error) {
            console.error("Failed to fetch queue", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchQueue()
        const interval = setInterval(fetchQueue, 10000)
        return () => clearInterval(interval)
    }, [])

    const handleSubmit = async () => {
        if (!topics.trim()) return

        setIsSubmitting(true)
        try {
            const topicList = topics.split('\n').filter(t => t.trim().length > 0)

            const res = await fetch('/api/admin/queue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topics: topicList }),
            })

            if (res.ok) {
                const data = await res.json()
                toast.success(`${data.count}개 주제가 대기열에 추가되었습니다.`)
                setTopics("")
                fetchQueue()
            } else {
                toast.error("추가에 실패했습니다.")
            }
        } catch (error) {
            toast.error("오류가 발생했습니다.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">대기중</Badge>
            case 'processing': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 animate-pulse">생성중</Badge>
            case 'completed': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">완료</Badge>
            case 'failed': return <Badge variant="destructive">실패</Badge>
            default: return <Badge variant="outline">{status}</Badge>
        }
    }

    const getStatCount = (status: string) => {
        return stats.find(s => s.status === status)?.count || 0
    }

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">🏭 AI 퀴즈 공장</h1>
                    <p className="text-muted-foreground mt-1">
                        주제를 대량으로 입력하면 AI가 자동으로 퀴즈를 생성하고 예약 발행합니다.
                    </p>
                </div>
                <Button onClick={fetchQueue} variant="outline" size="sm">
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    새로고침
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* 입력 폼 */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ListPlus className="h-5 w-5" />
                            주제 대량 입력
                        </CardTitle>
                        <CardDescription>
                            한 줄에 하나의 주제를 입력하세요. (예: 연애 세포 테스트)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder="주제를 입력하세요...&#13;&#10;연애 세포 테스트&#13;&#10;탕수육 부먹 찍먹 테스트&#13;&#10;직장인 꼰대력 테스트"
                            className="min-h-[300px] font-mono text-base"
                            value={topics}
                            onChange={(e) => setTopics(e.target.value)}
                        />
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                                {topics.split('\n').filter(t => t.trim()).length}개 감지됨
                            </span>
                            <Button onClick={handleSubmit} disabled={isSubmitting || !topics.trim()}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                대기열 추가하기
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* 상태 현황 */}
                <div className="space-y-6">
                    {/* 통계 카드 */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="py-4">
                                <CardTitle className="text-sm font-medium text-muted-foreground">대기중</CardTitle>
                                <div className="text-2xl font-bold mt-2">{getStatCount('pending')}</div>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="py-4">
                                <CardTitle className="text-sm font-medium text-muted-foreground">생성 완료</CardTitle>
                                <div className="text-2xl font-bold mt-2 text-green-600">{getStatCount('completed')}</div>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="py-4">
                                <CardTitle className="text-sm font-medium text-muted-foreground">실패</CardTitle>
                                <div className="text-2xl font-bold mt-2 text-red-600">{getStatCount('failed')}</div>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* 최근 목록 */}
                    <Card className="h-[400px] flex flex-col">
                        <CardHeader>
                            <CardTitle>최근 작업 목록</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>상태</TableHead>
                                        <TableHead>주제</TableHead>
                                        <TableHead className="text-right">생성일</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell width={100}>{getStatusBadge(item.status)}</TableCell>
                                            <TableCell className="font-medium">{item.keyword}</TableCell>
                                            <TableCell className="text-right text-muted-foreground text-sm">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {items.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                                대기열이 비어있습니다.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
