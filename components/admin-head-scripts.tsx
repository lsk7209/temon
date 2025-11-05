"use client"

import { useEffect } from "react"
import Script from "next/script"

interface ScriptConfig {
  id: string
  name: string
  script: string
  enabled: boolean
}

export default function AdminHeadScripts() {
  useEffect(() => {
    // localStorage에서 저장된 스크립트들을 읽어와서 head에 삽입
    try {
      const saved = localStorage.getItem('admin_head_scripts')
      if (saved) {
        const scripts: ScriptConfig[] = JSON.parse(saved)
        const enabledScripts = scripts.filter(s => s.enabled)
        
        enabledScripts.forEach((script) => {
          // 이미 삽입된 스크립트인지 확인
          const existing = document.querySelector(`script[data-admin-script-id="${script.id}"]`)
          if (existing) return

          // 스크립트 내용을 파싱하여 삽입
          const parser = new DOMParser()
          const doc = parser.parseFromString(script.script, 'text/html')
          const scriptsToInsert = doc.querySelectorAll('script')
          
          scriptsToInsert.forEach((scriptElement) => {
            const newScript = document.createElement('script')
            newScript.setAttribute('data-admin-script-id', script.id)
            
            // src 속성 복사
            if (scriptElement.src) {
              newScript.src = scriptElement.src
            }
            
            // async, defer 속성 복사
            if (scriptElement.async) newScript.async = true
            if (scriptElement.defer) newScript.defer = true
            
            // 인라인 스크립트 내용 복사
            if (scriptElement.textContent) {
              newScript.textContent = scriptElement.textContent
            }
            
            // head에 삽입
            document.head.appendChild(newScript)
          })
        })
      }
    } catch (error) {
      console.error("관리자 스크립트 로딩 실패:", error)
    }
  }, [])

  return null
}

