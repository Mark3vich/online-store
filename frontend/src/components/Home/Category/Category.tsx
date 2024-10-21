import React from 'react';

interface CategoryProps {
    categoryImage: string;
    categoryTitle: string;
    categoriesSubTitle: string[];
}

class Category extends React.Component<CategoryProps> {
    constructor(props: CategoryProps) {
        super(props);
    }
    render() {
        return (
            <div className='d-flex p-5 flex-grow-1 border-start border-end'>
                <div>
                    <img src={this.props.categoryImage} alt="SportBox1" />
                    <div className='block-category'>
                        <h3 className='mt-3 mb-3' style={{
                            color: '#0185ce',
                            fontFamily: "Oswald",
                            fontStyle: "normal",
                            fontSize: '14px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            lineHeight: '18px',
                            letterSpacing: '0.6px'
                        }}>{this.props.categoryTitle}</h3>
                        {this.props.categoriesSubTitle.map((subTitle, index) => (
                            <p key={index}>{subTitle}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;