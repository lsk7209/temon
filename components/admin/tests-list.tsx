"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RefreshCw, Trash2, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface TestItem {
    id: string
    slug: string
    title: string
    status: 'draft' | 'published'
    createdAt: string
    questionCount: number
}

export default function TestsList() {
    const [items, setItems] = useState<TestItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchTests = async () => {
        try {
            const res = await fetch('/api/admin/tests')
            const data = await res.json()
            if (data.items) setItems(data.items)
        } catch (error) {
            console.error("Failed to fetch tests", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTests()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("정말 삭제하시겠습니까?")) return

        try {
            const res = await fetch(`/api/admin/tests?id=${id}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success("삭제되었습니다.")
                fetchTests()
            } else {
                toast.error("삭제 실패")
            }
        } catch (error) {
            toast.error("오류 발생")
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">테스트 관리</h2>
                    <p className="text-muted-foreground">생성된 테스트 목록을 관리합니다.</p>
                </div>
                <Button onClick={fetchTests} variant="outline" size="sm">
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    새로고침
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>상태</TableHead>
                            <TableHead>제목</TableHead>
                            <TableHead>문항수</TableHead>
                            <TableHead>생성일</TableHead>
                            <TableHead className="text-right">작업</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <Badge variant={item.status === 'published' ? 'default' : 'secondary'}
                                        className={item.status === 'draft' ? "bg-orange-100 text-orange-700 hover:bg-orange-200" : "bg-green-100 text-green-700 hover:bg-green-200"}>
                                        {item.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex flex-col">
                                        <span>{item.title}</span>
                                        <span className="text-xs text-muted-foreground">/{item.slug}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{item.questionCount}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/tests/${item.slug}`} target="_blank">
                                            <Button variant="ghost" size="icon">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {items.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    생성된 테스트가 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
