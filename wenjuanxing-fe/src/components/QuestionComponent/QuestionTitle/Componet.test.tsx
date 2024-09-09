
import { render ,screen} from '@testing-library/react'
import Component from'./Componet'
import '@testing-library/jest-dom'


test('默认属性',()=>{
    render(<Component/>)
    const h = screen.getByText('一行标题')
    expect(h).toBeInTheDocument()
})

test('传入属性',()=>{
    render(<Component text='hello' level={2} isCenter={true}/>)
    const h = screen.getByText('hello')
    expect(h).toBeInTheDocument()
    expect(h.matches('h2')).toBeTruthy()

    const style = h.style
    expect(style.textAlign).toBe('center')
})