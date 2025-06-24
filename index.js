<script type="module">
    import {createClient} from 'https://esm.sh/@supabase/supabase-js@2'
    const supabaseUrl = 'https://stajayikouabaahexxpd.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YWpheWlrb3VhYmFhaGV4eHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NjA3NDQsImV4cCI6MjA2NjMzNjc0NH0.cuvqXO-0v0F2D5WCVwsoC6R3Kj_XG2MytKiC2sogQyA'
    const bucket = 'notes'
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    document.getElementById('save-button').addEventListener('click', async () => {
    const text = document.getElementById('writing-area').value.trim()
    if (!text) return alert("Note is empty.")

    const filename = `note-${new Date().toISOString().replace(/[:.]/g, '-')}.txt`
    const file = new Blob([text], {type: 'text/plain' })

    const {error} = await supabase
    .storage
    .from(bucket)
    .upload(filename, file, {
        cacheControl: '3600',
    upsert: false
      })

    if (error) {
        console.error(error)
      alert('Failed to upload note.')
    } else {
        alert('Note saved successfully!')
      document.getElementById('writing-area').value = ''
    }
  })
</script>
